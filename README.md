# Matt.net Custom Rec Room Servers

A custom Rec Room server implementation hosted on Vercel, allowing clients to connect directly and emulate classic Rec Room experiences.

## 🎮 Features

- **Direct Client Connection**: Connect old Rec Room clients directly to this server
- **Vercel Deployment**: Serverless, scalable hosting with automatic updates
- **Complete Game Data**: Rooms, avatars, equipment, consumables, and configurations
- **RESTful APIs**: Full REST API for game data access
- **Server Emulation**: Emulates Rec Room server protocols for compatibility

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
# Server runs on http://localhost:3000
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Your server will be live at `https://your-project.vercel.app`

## 📡 API Endpoints

- `GET /health` - Health check
- `GET /api/rooms` - All available rooms
- `GET /api/rooms/:roomId` - Get specific room
- `POST /api/rooms/:roomId/join` - Join a room
- `GET /api/avatar/default` - Default avatar config
- `GET /api/items/*` - Equipment, consumables, avatar items
- `GET /api/config` - Game configurations
- `POST /api/login` - Player authentication

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete documentation.

## 📝 Credits

Special thanks to **RebornRec** for their invaluable help and contributions to this project. This implementation uses their data structures and server protocols.

## 📂 Contents

- `api/index.js` - Express server with Rec Room APIs
- `vercel.json` - Vercel deployment configuration
- `package.json` - Node.js dependencies
- Data files:
  - `baserooms.txt` - Base game rooms
  - `communityrooms.txt` - User-created rooms
  - `avatar.txt` - Avatar configurations
  - `equipment.txt` - Equipment items
  - `consumables.txt` - Consumable items
  - `gameconfigs.txt` - Game settings
  - And more...

## ⚙️ Configuration

Copy `.env.example` to `.env` and update:
```
SERVER_URL=https://your-deployment.vercel.app
```

## 📖 Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Detailed setup instructions
- All API endpoint documentation
- Client connection guide
- Troubleshooting tips

## ⚖️ License & Disclaimer

This project uses resources and protocols from RebornRec. Please respect their copyright and licensing.

**DISCLAIMER**: This project is not affiliated with Rec Room in any way, nor intends to infringe on their copyrights. Distributing old versions of Rec Room is copyright infringement, so that's why matt.net does not come bundled with Rec Room at all.
