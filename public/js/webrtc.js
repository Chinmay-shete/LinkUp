// WEBRTC
let localStream;
let remoteStream;
let peerConnection;
let inCall = false;
let permissionGranted = false;

const rtcSettings = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        {
            urls: window.TURN_URL || 'turn:openrelay.metered.ca:80',
            username: window.TURN_USERNAME || '',
            credential: window.TURN_CREDENTIAL || ''
        }
    ],
};

// ── Show/hide video call UI elements ──────────────────────────
function showVideoCallUI() {
    document.querySelector('#local-pip').classList.remove('hidden');
    document.querySelector('#call-controls').classList.remove('hidden');
}

function hideVideoCallUI() {
    document.querySelector('#local-pip').classList.add('hidden');
    document.querySelector('#call-controls').classList.add('hidden');
}

// ── Initialize media & WebRTC ──────────────────────────────────
const initialize = async (isCaller = false) => {
    socket.off('signalingMessage');
    socket.on('signalingMessage', handleSignalingMessage);

    permissionGranted = false;
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        permissionGranted = true;

        const localVideo = document.querySelector('#localVideo');
        if (localVideo) {
            localVideo.srcObject = localStream;
            localVideo.style.display = 'block';
        }

        showVideoCallUI();

        if (isCaller) {
            await initiateOffer();
        }
        inCall = true;
        return true;
    } catch (err) {
        console.error('Camera/mic access denied:', err);
        alert('Please allow camera and microphone access to use video calls.');
        if (room) {
            socket.emit('signalingMessage', { room, message: JSON.stringify({ type: 'hangup' }) });
        }
        hangup();
        return false;
    }
};

const initiateOffer = async () => {
    if (!permissionGranted || !localStream) {
        console.warn('Cannot initiate offer: permission not granted or stream missing.');
        return;
    }
    await createPeerConnection();
    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('signalingMessage', {
            room,
            message: JSON.stringify({ type: 'offer', offer })
        });
    } catch (err) {
        console.error('Error creating offer:', err);
    }
};

const createPeerConnection = () => {
    if (!localStream) {
        console.warn('Aborting peer connection creation: localStream is empty.');
        return;
    }
    peerConnection = new RTCPeerConnection(rtcSettings);
    remoteStream = new MediaStream();

    const remoteVideo = document.querySelector('#remoteVideo');
    if (remoteVideo) {
        remoteVideo.srcObject = remoteStream;
        remoteVideo.style.display = 'block';
    }

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('signalingMessage', {
                room,
                message: JSON.stringify({ type: 'candidate', candidate: event.candidate })
            });
        }
    };

    peerConnection.onconnectionstatechange = () => {
        if (peerConnection && ['failed', 'closed'].includes(peerConnection.connectionState)) {
            hangup();
        }
    };
};

const handleSignalingMessage = async (message) => {
    const { type, offer, answer, candidate } = JSON.parse(message);
    if (type === 'offer') await handleOffer(offer);
    if (type === 'answer') await handleAnswer(answer);
    if (type === 'candidate' && peerConnection) {
        try { await peerConnection.addIceCandidate(candidate); }
        catch (e) { console.error(e); }
    }
    if (type === 'hangup') hangup();
};

const handleOffer = async (offer) => {
    if (!permissionGranted || !localStream) {
        console.warn('Aborting offer handling: localStream is missing.');
        return;
    }
    await createPeerConnection();
    try {
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('signalingMessage', { room, message: JSON.stringify({ type: 'answer', answer }) });
        inCall = true;
    } catch (e) {
        console.error('Failed to handle offer:', e);
    }
};

const handleAnswer = async (answer) => {
    if (peerConnection) {
        try { await peerConnection.setRemoteDescription(answer); }
        catch (e) { console.error('Failed to handle answer:', e); }
    }
};

// ── Hang up ────────────────────────────────────────────────────
function hangup() {
    if (peerConnection) { 
        peerConnection.close(); 
        peerConnection = null; 
    }
    if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
        localStream = null;
    }
    permissionGranted = false;

    const localVideo = document.querySelector('#localVideo');
    const remoteVideo = document.querySelector('#remoteVideo');
    if (localVideo) { localVideo.srcObject = null; localVideo.style.display = 'none'; }
    if (remoteVideo) { remoteVideo.srcObject = null; remoteVideo.style.display = 'none'; }

    if (room && inCall) {
        socket.emit('signalingMessage', { room, message: JSON.stringify({ type: 'hangup' }) });
    }
    inCall = false;
    hideVideoCallUI();

    // Reset mic/cam button states
    isAudioMuted = false;
    isVideoMuted = false;
    updateMicBtn();
    updateCamBtn();
}

// ── Video call button ──────────────────────────────────────────
document.querySelector('#video-call-btn').addEventListener('click', function() {
    if (!room) {
        alert('You need to be connected to a stranger first.');
        return;
    }
    socket.emit('startVideoCall', { room });
});

// ── Incoming call ──────────────────────────────────────────────
socket.on('incomingCall', function() {
    document.querySelector('#incoming-call').classList.remove('hidden');
});

socket.on('callAccepted', function() {
    initialize(true);
});

document.querySelector('#accept-call').addEventListener('click', async function() {
    document.querySelector('#incoming-call').classList.add('hidden');
    const success = await initialize(false);
    if (success) {
        socket.emit('acceptCall', { room });
    } else {
        socket.emit('rejectCall', { room });
    }
});

document.querySelector('#reject-call').addEventListener('click', function() {
    document.querySelector('#incoming-call').classList.add('hidden');
    socket.emit('rejectCall', { room });
});

socket.on('callRejected', function() {
    alert('Call was rejected by the other user.');
});

// ── Hang up button (inside video panel controls) ───────────────
document.querySelector('#hangup').addEventListener('click', hangup);

// ── Media toggles ─────────────────────────────────────────────
let isAudioMuted = false;
let isVideoMuted = false;

function updateMicBtn() {
    const btn = document.querySelector('#mic-toggle');
    if (btn) btn.style.backgroundColor = isAudioMuted ? '#ef4444' : '';
    const pipMic = document.querySelector('#micButton');
    if (pipMic) pipMic.style.backgroundColor = isAudioMuted ? 'rgba(239,68,68,0.5)' : '';
}

function updateCamBtn() {
    const btn = document.querySelector('#cam-toggle');
    if (btn) btn.style.backgroundColor = isVideoMuted ? '#ef4444' : '';
    const pipCam = document.querySelector('#cameraButton');
    if (pipCam) pipCam.style.backgroundColor = isVideoMuted ? 'rgba(239,68,68,0.5)' : '';
}

// Control bar mic/cam buttons
document.querySelector('#mic-toggle').addEventListener('click', () => {
    if (localStream) {
        isAudioMuted = !isAudioMuted;
        localStream.getAudioTracks().forEach(t => t.enabled = !isAudioMuted);
        updateMicBtn();
    }
});

document.querySelector('#cam-toggle').addEventListener('click', () => {
    if (localStream) {
        isVideoMuted = !isVideoMuted;
        localStream.getVideoTracks().forEach(t => t.enabled = !isVideoMuted);
        updateCamBtn();
    }
});

// PiP overlay mic/cam buttons (mirror same state)
const pipMicBtn = document.querySelector('#micButton');
if (pipMicBtn) {
    pipMicBtn.addEventListener('click', () => {
        if (localStream) {
            isAudioMuted = !isAudioMuted;
            localStream.getAudioTracks().forEach(t => t.enabled = !isAudioMuted);
            updateMicBtn();
        }
    });
}

const pipCamBtn = document.querySelector('#cameraButton');
if (pipCamBtn) {
    pipCamBtn.addEventListener('click', () => {
        if (localStream) {
            isVideoMuted = !isVideoMuted;
            localStream.getVideoTracks().forEach(t => t.enabled = !isVideoMuted);
            updateCamBtn();
        }
    });
}
