/*
    Sessions need a good second pass on them.
    They work for now, yeah, but they really aren't protected.
    Not does the max player count work ;-;
*/

import express from 'express';
import type { Request as JWTRequest } from 'express-jwt';
import { GameSessions } from '..';

const router = express.Router();

enum JoinResult
{
	// Token: 0x040057A7 RID: 22439
	Success,
	// Token: 0x040057A8 RID: 22440
	NoSuchGame,
	// Token: 0x040057A9 RID: 22441
	PlayerNotOnline,
	// Token: 0x040057AA RID: 22442
	InsufficientSpace,
	// Token: 0x040057AB RID: 22443
	EventNotStarted,
	// Token: 0x040057AC RID: 22444
	EventAlreadyFinished,
	// Token: 0x040057AD RID: 22445
	EventCreatorNotReady,
	// Token: 0x040057AE RID: 22446
	Blocked
}

const roomCodes: Map<string, number> = new Map<string, number>()

router.post('/v:version/joinrandom', async (req: JWTRequest, res) => {
    console.log("Attempting to join: " + req.body.ActivityLevelIds)

    if (req.body.ActivityLevelIds[0] === "76d98498-60a1-430c-ab76-b54a29b7a163")
    {
        //always go to a new dorm room instead of making a public one
        //dorms should be private by default.
        const session = GameSessions.create_session(req.body.ActivityLevelIds[0], true, parseInt(req.auth?.sub || "0"))
        const gameSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)
        
        res.json({
            Result: JoinResult.Success,
            GameSession: gameSession
        })
    }
    else
    {
        const session = GameSessions.find_activity_id(req.body.ActivityLevelIds)
        const gameSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)

        res.json({
            Result: JoinResult.Success,
            GameSession: gameSession
        })
    }

    if (req.body.ExpectedPlayerIds > 0)
    {
        //TODO: I assume this is party logic.
    }
});

router.get('/v:version/listpublicevents', async (req: JWTRequest, res) => {
    let data:any[] = []

    GameSessions.sessions.forEach(element => {
        if (element.creator_id !== undefined && element.is_private == false)
            data.push(element.get_rec_room_data())
    });

    //expects array
    res.json(data)
});

router.post('/v:version/create', async (req: JWTRequest, res) => {
    const session = GameSessions.create_session(req.body.ActivityLevelId, true, parseInt(req.auth?.sub || "0"))

    const gameSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)

    res.json({
        Result: JoinResult.Success,
        GameSession: gameSession
    })
})

router.post('/v:version/joinroomcode', async (req: JWTRequest, res) => {
    const session_id = roomCodes.get(req.body.RoomCode)
    let targetSession:GameSession | undefined

    if (session_id !== undefined)
    {
        const session = GameSessions.sessions.find((element) => element.id == session_id)

        if (session)
            targetSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)
        else
        {
            const session = GameSessions.create_session(req.body.ActivityLevelId, true, parseInt(req.auth?.sub || "0"))
            roomCodes.set(req.body.RoomCode, session.id)
            targetSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)
        }
    }
    else
    {
        const session = GameSessions.create_session(req.body.ActivityLevelId, true, parseInt(req.auth?.sub || "0"))
        roomCodes.set(req.body.RoomCode, session.id)
        targetSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)
    }

    res.json({
        Result: JoinResult.Success,
        GameSession: targetSession
    })
})

router.post('/v:version/modify', async (req: JWTRequest, res) => {
    console.log(req.body)
    let success:boolean = false;

    GameSessions.sessions.forEach(element => {
        if (element.id == req.body.GameSessionId)
        {
            if ('Private' in req.body)
                element.is_private = req.body.Private
            else if ('Name' in req.body)
                element.room_name = req.body.Name
            else if ('MaxCapacity' in req.body)
                element.MaxCapacity = req.body.MaxCapacity
            else if ('InProgress' in req.body)
                element.game_in_progress = req.body.InProgress
            else 
                // @ts-ignore it should be ok
                console.log("Unidentified param - ", Object.keys(req.body)[1] + ": " + req.body[Object.keys(req.body)[1]])

            success = true
        }
    });

    return res.json({Success: success, Message: success ? "Game session modified successfully." : "No such game session."})
})

router.post('/v:version/join', async (req: JWTRequest, res) => {
    console.log(req.body)

    console.log("Attempting to join: " + req.body.GameSessionId)

    const session = GameSessions.sessions.find((element) => element.id == req.body.GameSessionId)

    if (session)
    {
        const gameSession = GameSessions.join_session(parseInt(req.auth?.sub as string), session)

        res.json({
            Result: JoinResult.Success,
            GameSession: gameSession
        })
    }
    else
    {
        res.json({
            Result: JoinResult.NoSuchGame
        })
    }
})

router.post('/v:version/reportjoinresult', async (req: JWTRequest, res) => {
    //not like we have much to do with it rn
    res.sendStatus(200)
})


export default router;