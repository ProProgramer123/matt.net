import http_server from './server';
import { SessionManager } from './sessions';
import ws_server from './websocket';

console.log('Coach\'s Time Machine - 2017M Rec Room Server');

if (Bun.env.JWT_SECRET === "CTM_JWT_SECRET_CHANGE_ME")
	console.warn(`
!!! DEFAULT JWT TOKEN STILL IN USE !!!

3rd party attackers can generate JWT tokens for your server.
Change 'JWT_SECRET' in your '.env' to something long and unique.
`)

const charades_words:CharadesResponse[] = []
const charades_file = await Bun.file("./charades.txt").text()

charades_file.split(/\r?\n/).forEach(line => {
	if (!line.startsWith("#"))
		charades_words.push({ EN_US: line, Difficulty: 0 })
})

const PORT = Bun.env.PORT_HTTP || 3000;
http_server.listen(PORT, () => {
	console.log(`[API] Running on port ${PORT}`);
});
console.log(`[WS] Running on port ${ws_server.port}`);

const GameSessions: SessionManager = new SessionManager();

export { GameSessions, charades_words };