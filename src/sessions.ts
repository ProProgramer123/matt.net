let instance_counter = -1;

function generate_session_id() {instance_counter++; return instance_counter;}

export class SessionManager
{
	sessions: RecNetGameSession[] = []

	constructor()
	{
		setInterval(() => this.__purge(), 300000) // purge inactive sessions every 5 minutes
	}

	public disconnect_player(player_id: number)
	{
		this.sessions.forEach(element => {
			let _c = element.players.indexOf(player_id)
			if (_c !== -1)
				element.players.splice(_c, 1)
		});
	}

	public find_activity_id(activity_id: RecRoomActivityLevelId | RecRoomActivityLevelId[]) {
		const targets = Array.isArray(activity_id) ? activity_id : [activity_id];

		for (const target_id of targets) {
			const session = this.sessions.find(s => s.activity_id === target_id && s.can_join());
			if (session) return session;
		}

		const randomTarget = targets[Math.floor(Math.random() * targets.length)];
		return this.create_session(randomTarget as RecRoomActivityLevelId, false, undefined);
	}

	public find_player(player_id: number): GameSession | undefined
	{
		return this.sessions.find(session => session.players.includes(player_id))?.get_rec_room_data();
	}

	public create_session(activity_id: RecRoomActivityLevelId, is_private: boolean, creator_id: number | undefined)
	{
		const session = new RecNetGameSession(activity_id, is_private, creator_id)
		this.sessions.push(session)
		return session
	}

	public join_session(player_id: number, session: RecNetGameSession)
	{
		this.disconnect_player(player_id);

		session.players.push(player_id)

		return session.get_rec_room_data()
	}

	private __purge()
	{
		let oldsessions = this.sessions
		this.sessions = this.sessions.filter(item => item.players.length > 0);

		console.log(`Purged ${oldsessions.length - this.sessions.length} inactive instances.`)
	}
}

class RecNetGameSession
{
	id: number;
	players: number[] = [];
	is_private: boolean;
	creator_id: number | undefined;
	activity_id: RecRoomActivityLevelId;
	game_in_progress: boolean = false;
	room_id: string;
	MaxCapacity: number = 20;
	room_name: string | undefined;

	constructor(activity_id: RecRoomActivityLevelId, is_private: boolean, creator_id: number | undefined = undefined)
	{
		this.id = generate_session_id();
		this.is_private = is_private;
		this.activity_id = activity_id;
		this.creator_id = creator_id;

		this.room_id = crypto.randomUUID();
	}

	public get_rec_room_data()
	{
		const data:GameSession = {
			GameSessionId: this.id,
			RegionId: "us",
			RoomId: this.room_id,
			CreatorPlayerId: this.creator_id, 
			Name: this.room_name,
			ActivityLevelId: this.activity_id,
			Private: this.is_private,
			GameInProgress: this.game_in_progress,
			MaxCapacity: this.MaxCapacity,
			IsFull: false
		}
		return data;
	}

	public can_join()
	{
		return true;
	}
}