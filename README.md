# Linkup — Anonymous Chat & Video Call

A full-stack Node.js application for real-time anonymous text chatting and peer-to-peer video calling. It pairs users dynamically into private rooms.

🔗 **Live Demo**: https://linkup-9hcy.onrender.com

## Features
- **Real-time Matchmaking**: Users are automatically paired into a private room using a queue-based matching system.
- **Bi-directional WebSockets**: Instant text messaging with Socket.IO.
- **WebRTC Peer-to-Peer Video**: Fully implemented SDP offer/answer exchange and ICE candidate negotiation.
- **NAT Traversal**: Uses Google's STUN servers for robust connectivity.
- **Media Toggles**: UI for enabling/disabling camera and microphone tracks.
- **Graceful Disconnects**: Partners are notified when a user disconnects or leaves.

## Tech Stack
- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML5, EJS templating, Vanilla JS
- **Networking**: WebRTC (RTCPeerConnection, getUserMedia), STUN
- **Styling**: Tailwind CSS

## Architecture
- **Matchmaking**: Express serves the initial views, while Socket.IO runs on the same HTTP instance to pair users into ad-hoc rooms (`${socket1.id}-${socket2.id}`).
- **Signaling**: WebRTC signaling (Offer, Answer, ICE candidates, Hangup) is strictly relayed via the Socket.IO server.
- **P2P Streams**: Once signaling is complete, the video/audio streams connect directly between peers.

## Environment Variables
Create a `.env` file in the root directory. See `.env.example` for reference.
```env
PORT=3000
```

## Installation & Running Locally

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Run the server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` (or your configured `PORT`).

3. **Development (Tailwind CSS)**
   If you modify any `.ejs` templates, run the CSS watcher in a separate terminal:
   ```bash
   npm run build:css
   ```

## Socket.IO Events
- **`joinroom`**: Client requests to join the queue. Server pairs them if a partner is waiting.
- **`joined`**: Broadcasted to the room when a match is made.
- **`message`**: Text chat transmission.
- **`signalingMessage`**: Relays WebRTC payloads (SDP / ICE / Hangup).
- **`partnerDisconnected`**: Server notifies the remaining user that their partner has left.

## License
ISC

---

## 📂 Documentation & Reference Materials
Check out the `docs/` folder for comprehensive documentation:
- [Technical & Project Report](file:///Users/chinu/Developer/VS%20CODE%20NOT%20IMP/omegal_clone/docs/project_documentation.html): Details project logic, user flow, packages, and code architecture.
- [Linkup Project Analysis](file:///Users/chinu/Developer/VS%20CODE%20NOT%20IMP/omegal_clone/docs/linkup_analysis.md): A detailed critique, observations, and ideas for resume optimization.
- **Design Layouts**: Available in the `docs/design/` directory.
