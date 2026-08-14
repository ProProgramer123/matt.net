import express from 'express';
import morgan from 'morgan';
import { expressjwt } from 'express-jwt';
import type { Request as JWTRequest } from 'express-jwt';
import { DailyObjectives } from './static/DailyObjectives';
import { LevelProgressionMaps } from './static/LevelProgressionMaps';

const jwtSecret = process.env.JWT_SECRET || 'development-secret';
const publicOrigin = process.env.APP_ORIGIN || process.env.RENDER_EXTERNAL_URL || 'https://matt-net.onrender.com';

const public_url: RegExp[] = [
	/\/cdn\/.*/,
	/\/api\/versioncheck\/v.*/,
	/\/api\/config\/v.*/,
	/\/api\/platformlogin\/v.*/,
	/\/api\/images\/v.*\/named/,
	/\//,
]

const app = express();

app.set('trust proxy', 1);

app.use((req, res, next) => {
	if (req.url.includes('//')) {
		req.url = req.url.replace(/\/+/g, '/');
	}
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	if (req.method === 'OPTIONS')
		return res.sendStatus(204);
	next();
});

app.use(morgan('dev')); //Logging of requests
app.use(express.json())                          //used for req.body
app.use(express.urlencoded({ extended: true })); //used for req.body

//Authorization with error checking
app.use(expressjwt({secret: jwtSecret, algorithms: ["HS256"]}).unless({
	path: [...public_url, '/', '/favicon.ico'],
	method: ['GET', 'OPTIONS', 'HEAD']
}));
app.use(function(err: any, req: any, res: any, next: any) {
    if(err.name === 'UnauthorizedError') 
	{
		res.sendStatus(401);
		return;
    }
	else if (err) {
		console.log(err)
		res.sendStatus(500);
		return;
	}
 	next();
});

/*
	===ROUTES===
*/

import CdnRouter from './routes/cdn'
app.use("/cdn", CdnRouter)

import ImagesRouter from './routes/images'
app.use("/api/images", ImagesRouter)

import PlatformLoginRouter from './routes/platformlogin'
app.use("/api/platformlogin", PlatformLoginRouter)

import PlayerRouter from './routes/players'
app.use("/api/players", PlayerRouter)

import SettingsRouter from './routes/settings'
app.use("/api/settings", SettingsRouter)

import AvatarRouter from './routes/avatar'
app.use("/api/avatar", AvatarRouter)

import ActivityRouter from './routes/activities'
app.use("/api/activities", ActivityRouter)

import GameSessionRouter from './routes/gamesession'
app.use("/api/gamesessions", GameSessionRouter)

import PlayerReportingRouter from './routes/playerreporting'
app.use("/api/PlayerReporting", PlayerReportingRouter)

import LeaderboardRouter from './routes/leaderboard'
app.use("/api/Leaderboard/v:version", LeaderboardRouter)

/*
	===Misc. APIs that are safe to chill here===
*/

app.get('/', (req, res) => {
	res.json({ ok: true, message: 'Server is running' });
});

app.get('/api/versioncheck/v:version', (req, res) => {
	if (!process.env.VERSION_CHECK)
		console.warn("VERSION_CHECK environment variable is not set!");

	const version = req.query.v;

	if (process.env.IGNORE_VERSION_CHECK === "true") 
		return res.json({ ValidVersion: true });

	if (version === process.env.VERSION_CHECK) 
		return res.json({ ValidVersion: true });
	else 
		return res.json({ ValidVersion: false });
});

app.get('/api/config/v:version', (req, res) => {
	const forwardedProto = req.get('x-forwarded-proto') || req.protocol;
	const baseOrigin = (process.env.APP_ORIGIN || process.env.RENDER_EXTERNAL_URL || `${forwardedProto}://${req.get('host')}` || publicOrigin).replace(/\/$/, '');
	res.json({
		MessageOfTheDay: process.env.MOTD || "Welcome to Coach's Time Machine! Change this in the .env file.",
		CdnBaseUri: `${baseOrigin}/cdn`,
		LevelProgressionMaps: LevelProgressionMaps,
		MatchmakingParams: { PreferFullRoomsFrequency: 1, PreferEmptyRoomsFrequency: 0 },
		DailyObjectives: DailyObjectives,
		ConfigTable: [{Key: "Gift.DropChance", Value: "0.5"}, {Key: "Gift.XP", Value: "0.5"}],
		PhotonConfig: { CloudRegion: "us", CrcCheckEnabled: false, EnableServerTracingAfterDisconnect: false }
	});
});

app.get('/api/config/v:version/amplitude', (req, res) => {
    res.json({ AmplitudeKey: process.env.AMPLITUDE_KEY || "NoKeyProvided" });
});

app.get('/api/messages/v:version/get', (req, res) => {
	res.json([]); //TODO: Reverse engineer this.
});

app.get('/api/relationships/v:version/get', (req, res) => {
	res.json([]); //TODO: Reverse engineer this.
});

app.get('/api/equipment/v:version/getUnlocked', (req, res) => {
	res.json([]); //TODO: Reverse engineer this.
});

app.get('/api/events/v:version/list', (req, res) => {
	res.json([]); //TODO: Reverse engineer this.
});

//This is for weekly challenges.
//TODO: Properly implement
app.get('/api/challenge/v:version/getCurrent', (req, res) => {
	//This system sucks ass.

	const date = Date.now()

	const data = {
		ChallengeMapId: 1,
		StartAt: date - 864000, //1 day
		EndAt: date + 6048000000000, //1 week
		ServerTime: date,
		Challenges: [], //RecNet.DEMFBKIKHDN
		Gifts: [], //RecNet.GEDPICALELM
		ChallengeThemeString: "Placeholder Weekly so Daily challenges can work",
		ChallengeThemeId: 1
	}

	res.json({ Success: true, Message: JSON.stringify(data) });
});

export default app;