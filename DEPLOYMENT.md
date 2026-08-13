# Matt.net Custom Rec Room Server - Deployment Guide

## Overview
This is a custom Rec Room server powered by Vercel. It serves game data and emulates Rec Room server protocols, allowing clients to connect directly to this Vercel-hosted server.

## Local Development

### Prerequisites
- Node.js 18.x or higher
- npm

### Setup
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The server will run on `http://localhost:3000`

4. Test the health endpoint:
```bash
curl http://localhost:3000/health
```

## Deployment to Vercel

### Prerequisites
- Vercel account (free tier available)
- Vercel CLI installed: `npm i -g vercel`
- Git repository

### Deploy Steps

1. **Login to Vercel:**
```bash
vercel login
```

2. **Deploy the project:**
```bash
vercel
```

3. **Set environment variables (if needed):**
```bash
vercel env add SERVER_URL
```

4. **Access your deployed server:**
Your server will be available at `https://your-project.vercel.app`

### Automatic Deployment
Push to your default branch (main) and Vercel will automatically deploy.

## API Endpoints

### Health Check
```
GET /health
```

### Room Endpoints
```
GET /api/rooms                    # All rooms
GET /api/rooms/base              # Base rooms only
GET /api/rooms/community         # Community rooms
GET /api/rooms/hot               # Hot rooms
GET /api/rooms/:roomId           # Specific room
POST /api/rooms/:roomId/join     # Join a room
```

### Avatar & Items
```
GET /api/avatar/default          # Default avatar
GET /api/items/avatar            # Avatar items
GET /api/items/equipment         # Equipment items
GET /api/items/consumables       # Consumable items
```

### Configuration
```
GET /api/config                  # All configs
GET /api/config/:key             # Specific config
```

### Player Management
```
GET /api/players/banned          # Banned players list
```

### Authentication
```
POST /api/login                  # Login (username/password)
POST /api/server/init            # Initialize server
```

### Other
```
GET /api/motd                    # Message of the Day
GET /                            # Server info
```

## Connecting Clients

### For Old Rec Room Clients
Update the server URL in your client configuration to point to:
```
https://your-deployment.vercel.app
```

### Example Request
```bash
curl https://your-deployment.vercel.app/health
```

## Credits
- **RebornRec** for providing the data structure and protocols
- **Vercel** for hosting infrastructure
- Data files and configurations from the community

## Troubleshooting

### Connection Issues
1. Verify the Vercel URL is accessible
2. Check CORS is enabled (it is by default)
3. Verify environment variables are set

### Data Loading Issues
1. Ensure all `.txt` data files are in the root directory
2. Check file permissions are readable
3. Verify JSON format in data files

### Performance
- Vercel has cold start times (~1-2 seconds)
- Data is cached in memory for fast responses
- Use regional deployments for better latency

## Security Notes
- This server is designed for local/private networks
- Do not expose sensitive data
- Implement proper authentication before production use
- Use HTTPS (Vercel provides this automatically)

## License
This project uses data and protocols from RebornRec. Please respect their copyright and license.
