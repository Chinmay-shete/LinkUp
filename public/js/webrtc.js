// WEBRTC
let localStream;
let remoteStream;
let peerConnection;
let inCall = false;

const rtcSettings = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
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

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        const localVideo = document.querySelector('#localVideo');
        localVideo.srcObject = localStream;
        localVideo.style.display = 'block';

        showVideoCallUI();

        if (isCaller) {
            await initiateOffer();
        }
        inCall = true;
    } catch (err) {
        console.error('Camera/mic access denied:', err);
        alert('Please allow camera and microphone access to use video calls.');
    }
};

const initiateOffer = async () => {
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
    peerConnection = new RTCPeerConnection(rtcSettings);
    remoteStream = new MediaStream();

    const remoteVideo = document.querySelector('#remoteVideo');
    remoteVideo.srcObject = remoteStream;
    remoteVideo.style.display = 'block';

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
        if (['failed', 'closed'].includes(peerConnection.connectionState)) {
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
    try { await peerConnection.setRemoteDescription(answer); }
    catch (e) { console.error('Failed to handle answer:', e); }
};

// ── Hang up ────────────────────────────────────────────────────
function hangup() {
    if (peerConnection) { peerConnection.close(); peerConnection = null; }
    if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
        localStream = null;
    }

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

document.querySelector('#accept-call').addEventListener('click', function() {
    document.querySelector('#incoming-call').classList.add('hidden');
    initialize(false);
    socket.emit('acceptCall', { room });
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
    btn.style.backgroundColor = isAudioMuted ? '#ef4444' : '';
    // Also update the pip mic button
    const pipMic = document.querySelector('#micButton');
    if (pipMic) pipMic.style.backgroundColor = isAudioMuted ? 'rgba(239,68,68,0.5)' : '';
}

function updateCamBtn() {
    const btn = document.querySelector('#cam-toggle');
    btn.style.backgroundColor = isVideoMuted ? '#ef4444' : '';
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
document.querySelector('#micButton').addEventListener('click', () => {
    if (localStream) {
        isAudioMuted = !isAudioMuted;
        localStream.getAudioTracks().forEach(t => t.enabled = !isAudioMuted);
        updateMicBtn();
    }
});

document.querySelector('#cameraButton').addEventListener('click', () => {
    if (localStream) {
        isVideoMuted = !isVideoMuted;
        localStream.getVideoTracks().forEach(t => t.enabled = !isVideoMuted);
        updateCamBtn();
    }
});
