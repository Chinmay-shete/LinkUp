# Omegal — Anonymous Chat & Video Call

A minimal Omegle-style web app for anonymous one-to-one text chat with  video calling.

🔗 Live Demo: https://omegal-three.vercel.app/chat

- **Server**: Express 5 + Socket.IO 4 (CommonJS)
- **Views**: EJS
- **Styles**: Tailwind CSS 3

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Build CSS (Tailwind)](#build-css-tailwind)
- [HTTP Endpoints](#http-endpoints)
- [Socket Events](#socket-events)
- [WebRTC Signaling Flow](#webrtc-signaling-flow)
- [Directory Structure](#directory-structure)
- [Deployment](#deployment)
- [Production Checklist](#production-checklist)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features
- Anonymous one-to-one matchmaking queue
- Realtime text chat via Socket.IO rooms
- WebRTC video call (start, accept/reject, hang up)
- Minimal EJS UI with Tailwind styling

## Architecture
- Express serves EJS views and static assets from `public/`.
- Socket.IO runs on the same HTTP server instance and pairs users into ad-hoc rooms.
- WebRTC uses a public STUN server for NAT traversal; signaling is relayed via Socket.IO.

## Requirements
- Node.js 18+
- npm 9+

## Installation
```bash
npm install
```

## Scripts
```bash
# Tailwind watch: ./public/css/tailwind.css → ./public/css/style.css
npm run build:css

```

## Environment Variables
- `PORT` (optional): HTTP port. Defaults to `3000` locally.

In `index.js`, the server is created as `srever`. To honor platform `PORT` vars, adjust as follows:
```js
const PORT = process.env.PORT || 3000;
srever.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

## Running Locally
```bash
node index.js
```
Open `http://localhost:3000`.

## Build CSS (Tailwind)
Input: `public/css/tailwind.css` → Output: `public/css/style.css`
```bash
 
## Socket Events
Client connects to default namespace (`io()`).

Emitted by client
- `joinroom` → Ask server to match with a partner.
- `message` payload: `{ room, message }` → Send text to partner.
- `signalingMessage` payload: `{ room, message }` → Stringified JSON for WebRTC (offer/answer/candidate/hangup).
- `startVideoCall` payload: `{ room }` → Request a call with the peer.
- `acceptCall` payload: `{ room }` → Accept incoming call.
- `rejectCall` payload: `{ room }` → Reject incoming call.

Emitted by server
- `joined` payload: `roomname` → Sent to both users once paired.
- `message` payload: `message` → Partner’s text message.
- `signalingMessage` payload: `message` → Forwarded signaling between peers.
- `incomingCall` → A peer initiated a call.
- `callAccepted` → Peer accepted the call.
- `callRejected` → Peer rejected the call.

## WebRTC Signaling Flow
1. Client A clicks video; emits `startVideoCall` → server notifies B with `incomingCall`.
2. If B accepts, both peers initialize media and RTCPeerConnection.
3. Offer/Answer exchange via `signalingMessage`:
   - A creates offer → emits `signalingMessage` with `{ type: "offer" }`.
   - B sets remote offer, creates answer → emits `{ type: "answer" }`.
4. ICE candidates are exchanged via `{ type: "candidate" }` messages.
5. Either peer can end with `{ type: "hangup" }` and stop local tracks.

## Directory Structure
```
/
├─ index.js              # Express app + Socket.IO matchmaking/signaling
├─ routes/index.js       # Routes for / and /chat
├─ views/                # EJS templates (index.ejs, chat.ejs, partials/)
├─ public/css/           # Tailwind input (tailwind.css) and output (style.css)
├─ tailwind.config.js    # Tailwind configuration
└─ package.json
```

 
## Production Checklist
- HTTPS enabled (TLS certs or proxy)
- Handle `PORT` env var
- Robust CORS settings if serving UI and server on different origins
- Rate limiting / moderation (not included in this demo)
- Logging and monitoring of signaling errors

## Troubleshooting
- Camera/mic prompt not shown: allow permissions in browser site settings.
- No video: confirm local/remote `<video>` elements are visible and streams attached; check console for WebRTC errors.
- Signaling not flowing: verify Socket.IO connection and that `signalingMessage` payloads are stringified JSON.
- STUN blocked: replace `stun:stun.l.google.com:19302` with a reachable STUN/TURN service.

## License
ISC

