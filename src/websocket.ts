import { GameSessions } from ".";

export enum WebsocketResponses
{
	// Token: 0x040056DC RID: 22236
	RelationshipChanged = 1,
	// Token: 0x040056DD RID: 22237
	MessageReceived,
	// Token: 0x040056DE RID: 22238
	MessageDeleted,
	// Token: 0x040056DF RID: 22239
	SubscriptionListUpdated = 9,
	// Token: 0x040056E0 RID: 22240
	SubscriptionUpdateProfile = 11,
	// Token: 0x040056E1 RID: 22241
	SubscriptionUpdatePresence,
	// Token: 0x040056E2 RID: 22242
	SubscriptionUpdateGameSession,
	// Token: 0x040056E3 RID: 22243
	ModerationQuitGame = 20,
	// Token: 0x040056E4 RID: 22244
	ModerationUpdateRequired,
	// Token: 0x040056E5 RID: 22245
	ModerationKick,
	// Token: 0x040056E6 RID: 22246
	ModerationKickAttemptFailed,
	// Token: 0x040056E7 RID: 22247
	GiftPackageReceived = 30
}

export const ws_connections = new Map<number, any>();

const wsServer = process.env.VERCEL
	? { port: Number(process.env.PORT_WS || 3001), readyState: 1 }
	: Bun.serve({
		port: Number(process.env.PORT_WS || 3001),

		fetch(req, server) {
			const upgraded = server.upgrade(req);
			if (!upgraded) {
				return new Response("WebSocket upgrade failed", { status: 400 });
			}
			return new Response("Not found", { status: 404 });
		},

		websocket: {
			open(ws)
			{
				console.log("Client connected");
			},

			message(ws, message)
			{
				console.log("[WS] ", message);
				const data = JSON.parse(message as string)

				if (data.api)
				{
					switch (data.api)
					{
						case "heartbeat":
						{
							ws.send(JSON.stringify({Id: 0, Msg: {}}));
						} break;
						case "playerSubscriptions/v1/update":
						{
							data.param.PlayerIds.forEach((element: number) => {
								const sessionData = GameSessions.find_player(element)

								ws.send(JSON.stringify({Id: WebsocketResponses.SubscriptionUpdatePresence, Msg: {PlayerId: element, IsOnline: sessionData == undefined ? false : true, GameSession: sessionData}}));
							});
						} break;
						default:
						{
							console.warn("[WS] Not implemented: " + data.api)
							ws.send(JSON.stringify({Id: 0, Msg: {}}));
						} break;
					}
				}
				else if (data.PlayerId)
				{
					ws.send(JSON.stringify({"Id": 0, Msg: {}}));
					ws_connections.set(parseInt(data.PlayerId), ws)
				}
				else
				{
					ws.close(1000, "You are not Rec Room.")
				}
			},

			close(ws, code, reason)
			{
				const _c = find_connection_from_ws(ws)

				if (_c)
				{
					GameSessions.disconnect_player(_c)
					ws_connections.delete(_c)
				}

				console.log("Client disconnected.", code, reason);
			}
		},
	})

interface WsMessage
{
	Id: WebsocketResponses,
	Msg: object
}

export function send_ws_message(player_id: number, data: WsMessage)
{
	const ws = ws_connections.get(player_id)

	if (ws)
		ws.send(JSON.stringify(data))
}

//https://stackoverflow.com/questions/47135661/how-can-i-get-a-key-in-a-javascript-map-by-its-value/47136047#47136047
function find_connection_from_ws(ws: any)
{
	for (let [key, value] of ws_connections.entries())
	{
		if (value === ws)
			return key;
	}
}

export default wsServer;