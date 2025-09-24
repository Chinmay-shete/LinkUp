# Omegal — Anonymous Chat & Video Call (Express + Socket.IO)

Minimal Omegle-style chat with one-to-one text and optional WebRTC video. Server is Express + Socket.IO, views are EJS, styles via Tailwind CSS.

## Features
- Anonymous one-to-one matchmaking (first-in queue)
- Realtime text chat via Socket.IO
- WebRTC video call: start, accept/reject, hang up
- Tailwind-styled EJS pages

## Tech Stack
- **Server**: Node.js, Express 5, Socket.IO 4
- **Views**: EJS
- **Styles**: Tailwind CSS 3

## Quickstart

### Prerequisites
- Node.js 18+ and npm 9+

### Install dependencies
```bash
npm install
```

### Build CSS (Tailwind)
Input: `public/css/tailwind.css` → Output: `public/css/style.css`
```bash
# one-time build
npx tailwindcss -i ./public/css/tailwind.css -o ./public/css/style.css

# watch mode (recommended during dev)
npm run build:css
```

