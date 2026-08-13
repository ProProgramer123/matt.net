const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load data files
const loadDataFile = (filename) => {
  try {
    const filePath = path.join(__dirname, '..', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(data);
    } catch {
      return data; // Return as string if not JSON
    }
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message);
    return null;
  }
};

// Cache data files
const dataCache = {
  baseRooms: loadDataFile('baserooms.txt'),
  communityRooms: loadDataFile('communityrooms.txt'),
  avatar: loadDataFile('avatar.txt'),
  avatarItems: loadDataFile('avataritems.txt'),
  equipment: loadDataFile('equipment.txt'),
  consumables: loadDataFile('consumables.txt'),
  gameConfigs: loadDataFile('gameconfigs.txt'),
  hotRooms: loadDataFile('hotrooms.txt'),
  bannedPlayers: loadDataFile('banned.txt'),
  version: loadDataFile('version.txt'),
  motd: loadDataFile('motd.txt'),
};

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'Matt.net Custom Rec Room Server',
    version: dataCache.version || '1.0.0',
    credits: 'Powered by RebornRec',
    timestamp: new Date().toISOString(),
  });
});

// Also available at /api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'Matt.net Custom Rec Room Server',
    version: dataCache.version || '1.0.0',
    credits: 'Powered by RebornRec',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// API INFO ENDPOINT
// ============================================
app.get('/api', (req, res) => {
  res.json({
    success: true,
    server: 'Matt.net Custom Rec Room Servers',
    status: 'online',
    version: dataCache.version || '1.0.0',
    credits: 'Powered by RebornRec',
    documentation: 'Full API documentation',
    endpoints: {
      health: {
        'GET /health': 'Health check',
        'GET /api/health': 'Health check (alias)',
      },
      rooms: {
        'GET /api/rooms': 'Get all rooms',
        'GET /api/rooms/base': 'Get base rooms',
        'GET /api/rooms/community': 'Get community rooms',
        'GET /api/rooms/hot': 'Get hot rooms',
        'GET /api/rooms/:roomId': 'Get specific room',
        'POST /api/rooms/:roomId/join': 'Join a room',
      },
      avatar: {
        'GET /api/avatar/default': 'Get default avatar',
        'GET /api/items/avatar': 'Get avatar items',
        'GET /api/items/equipment': 'Get equipment items',
        'GET /api/items/consumables': 'Get consumable items',
      },
      config: {
        'GET /api/config': 'Get all configurations',
        'GET /api/config/:key': 'Get specific config',
      },
      players: {
        'GET /api/players/banned': 'Get banned players list',
      },
      auth: {
        'POST /api/login': 'Login (username/password)',
        'POST /api/server/init': 'Initialize server session',
      },
      messages: {
        'GET /api/motd': 'Get message of the day',
      },
    },
  });
});

// ============================================
// ROOM ENDPOINTS
// ============================================
app.get('/api/rooms', (req, res) => {
  const allRooms = [
    ...(Array.isArray(dataCache.baseRooms) ? dataCache.baseRooms : []),
    ...(Array.isArray(dataCache.communityRooms) ? dataCache.communityRooms : []),
  ];
  res.json({
    success: true,
    data: allRooms,
    count: allRooms.length,
  });
});

app.get('/api/rooms/base', (req, res) => {
  res.json({
    success: true,
    data: dataCache.baseRooms || [],
  });
});

app.get('/api/rooms/community', (req, res) => {
  res.json({
    success: true,
    data: dataCache.communityRooms || [],
  });
});

app.get('/api/rooms/hot', (req, res) => {
  res.json({
    success: true,
    data: dataCache.hotRooms || [],
  });
});

app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const allRooms = [
    ...(Array.isArray(dataCache.baseRooms) ? dataCache.baseRooms : []),
    ...(Array.isArray(dataCache.communityRooms) ? dataCache.communityRooms : []),
  ];
  
  const room = allRooms.find(r => r.RoomId === parseInt(roomId));
  
  if (!room) {
    return res.status(404).json({
      success: false,
      error: 'Room not found',
    });
  }
  
  res.json({
    success: true,
    data: room,
  });
});

// ============================================
// AVATAR ENDPOINTS
// ============================================
app.get('/api/avatar/default', (req, res) => {
  res.json({
    success: true,
    data: dataCache.avatar,
  });
});

app.get('/api/items/avatar', (req, res) => {
  res.json({
    success: true,
    data: dataCache.avatarItems || [],
  });
});

app.get('/api/items/equipment', (req, res) => {
  res.json({
    success: true,
    data: dataCache.equipment || [],
  });
});

app.get('/api/items/consumables', (req, res) => {
  res.json({
    success: true,
    data: dataCache.consumables || [],
  });
});

// ============================================
// CONFIGURATION ENDPOINTS
// ============================================
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    data: dataCache.gameConfigs || [],
  });
});

app.get('/api/config/:key', (req, res) => {
  const { key } = req.params;
  const configs = Array.isArray(dataCache.gameConfigs) ? dataCache.gameConfigs : [];
  const config = configs.find(c => c.Key === key);
  
  if (!config) {
    return res.status(404).json({
      success: false,
      error: `Config key '${key}' not found`,
    });
  }
  
  res.json({
    success: true,
    data: config,
  });
});

// ============================================
// PLAYER ENDPOINTS
// ============================================
app.get('/api/players/banned', (req, res) => {
  const bannedList = dataCache.bannedPlayers ? String(dataCache.bannedPlayers).split('\n').filter(Boolean) : [];
  res.json({
    success: true,
    data: bannedList,
    count: bannedList.length,
  });
});

// ============================================
// MESSAGE OF THE DAY
// ============================================
app.get('/api/motd', (req, res) => {
  res.json({
    success: true,
    data: dataCache.motd || 'Welcome to Custom Rec Room Servers!',
  });
});

// ============================================
// SERVER INITIALIZATION ENDPOINT
// ============================================
app.post('/api/server/init', (req, res) => {
  const { serverId, region } = req.body;
  
  res.json({
    success: true,
    message: 'Server initialized',
    serverId: serverId || 'default-server',
    region: region || 'us-east-1',
    serverUrl: process.env.SERVER_URL || `https://${req.headers.host}`,
    timestamp: new Date().toISOString(),
    credits: 'Powered by RebornRec & Matt.net',
  });
});

// ============================================
// LOGIN ENDPOINT
// ============================================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username) {
    return res.status(400).json({
      success: false,
      error: 'Username required',
    });
  }
  
  // Generate a mock session token
  const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
  
  res.json({
    success: true,
    username,
    sessionToken,
    userId: Math.floor(Math.random() * 1000000),
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// JOIN ROOM ENDPOINT
// ============================================
app.post('/api/rooms/:roomId/join', (req, res) => {
  const { roomId } = req.params;
  const { userId, sessionToken } = req.body;
  
  const allRooms = [
    ...(Array.isArray(dataCache.baseRooms) ? dataCache.baseRooms : []),
    ...(Array.isArray(dataCache.communityRooms) ? dataCache.communityRooms : []),
  ];
  
  const room = allRooms.find(r => r.RoomId === parseInt(roomId));
  
  if (!room) {
    return res.status(404).json({
      success: false,
      error: 'Room not found',
    });
  }
  
  res.json({
    success: true,
    message: `Joined room: ${room.Name}`,
    room: room,
    sessionId: Buffer.from(`${roomId}:${Date.now()}`).toString('base64'),
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// ROOT ENDPOINT
// ============================================
app.get('/', (req, res) => {
  res.json({
    server: 'Matt.net Custom Rec Room Servers',
    status: 'online',
    version: dataCache.version || '1.0.0',
    credits: 'Powered by RebornRec',
    documentation: 'Available at /api/docs',
    endpoints: {
      health: ['/health', '/api/health'],
      rooms: '/api/rooms',
      avatar: '/api/avatar/default',
      config: '/api/config',
      login: 'POST /api/login',
      joinRoom: 'POST /api/rooms/:roomId/join',
    },
  });
});

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    available: [
      '/health',
      '/api/health',
      '/api/rooms',
      '/api/rooms/base',
      '/api/rooms/community',
      '/api/rooms/hot',
      '/api/rooms/:roomId',
      '/api/avatar/default',
      '/api/items/avatar',
      '/api/items/equipment',
      '/api/items/consumables',
      '/api/config',
      '/api/config/:key',
      '/api/players/banned',
      '/api/motd',
      'POST /api/login',
      'POST /api/server/init',
      'POST /api/rooms/:roomId/join',
    ],
  });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// Export for Vercel
module.exports = app;

// Local development server
const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🎮 Matt.net Custom Rec Room Server running on http://localhost:${PORT}`);
    console.log(`📝 Credits: Powered by RebornRec`);
    console.log(`✅ Health check: http://localhost:${PORT}/health`);
  });
}
