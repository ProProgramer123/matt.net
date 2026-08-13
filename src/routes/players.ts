import express from 'express';
import { create_account, get_account_data } from '../db/datamanager';
import type { Request as JWTRequest } from 'express-jwt';

import { eq, like, or } from "drizzle-orm";
import db from '../db/database'
import { users } from '../db/schema';

import { send_ws_message, WebsocketResponses } from '../websocket';

const router = express.Router();

router.get(`/v:version/search`, async (req: JWTRequest, res) => {
    const name = req.query.name as string;
    let output: RecRoomPlayer[] = [];
    const result = await db.select().from(users).where(or(like(users.username, `%${name.toLowerCase()}%`), like(users.displayname, `%${name.toLowerCase()}%`)));
    
    result.forEach(element => {
        output.push({
            Id: element.id,
            Username: element.username,
            DisplayName: element.displayname || element.username,
            XP: element.xp,
            Level: element.level,
            Reputation: 0, //TODO: Reputation?
            Verified: element.registered,
            Developer: element.developer,
            HasEmail: true,
            CanReceiveInvites: true,
            ProfileImageName: element.profileImage,
            JuniorProfile: false,
            ForceJuniorImages: false,
            PendingJunior: false,
            HasBirthday: true
        })
    })
    res.json(output)
})

router.get(`/v:version/phonelastfour`, async (req: JWTRequest, res) => {
    res.json({PhoneNumber: "PHONE NUMBER NOT SUPPORTED"})
})

//Keep this as the last request.
router.get('/v:version/:playerId', async (req, res) => {
	const data = await get_account_data(parseInt(req.params.playerId))

    return res.json(data);
});

router.post(`/v:version/displayname`, async (req: JWTRequest, res) => {
    const newName = req.body.Name as string

    const player_id = req.auth?.sub;

    if (!player_id) 
		return res.sendStatus(400)

    await db.update(users).set({ displayname: newName }).where(eq(users.id, parseInt(player_id)))

    return res.json({ Success: true, Message: "" })
})

router.post('/v:version/createProfile', async (req: JWTRequest, res) => {
    const accountName = req.body.Name as string

    const newAccount = await create_account(accountName, req.auth?.platformId)

    if (newAccount.success)
    {
        const accountData = await get_account_data(newAccount.id)
        return res.json(accountData)
    }
    else
    {
        return res.sendStatus(500)
    }
})

router.post('/v:version/list', async (req: JWTRequest, res) => {
    const result: RecRoomPlayer[] = []

    req.body.forEach(async (element: number) => {
        let _res = await get_account_data(element) as RecRoomPlayer
        result.push(_res)
    });
    res.json(result)
})

router.post('/v:version/verify', async (req: JWTRequest, res) => {
    const player_id = req.auth?.sub

    if (!player_id) return;

    //If you wish to add proper registration go for it.
    //I'm leaving it as an auto registration process though.
    setTimeout(async () => {
        await db.update(users).set({ registered: true }).where(eq(users.id, parseInt(player_id)))

        const data = await get_account_data(parseInt(player_id)) as RecRoomPlayer

        send_ws_message(parseInt(player_id), {Id: WebsocketResponses.SubscriptionUpdateProfile, Msg: data})
    }, 1000)

    return res.json({Message: "OK"})
})

//TODO: Second pass over this.
router.post('/v:version/listByPlatformId', async (req: JWTRequest, res) => {
    const ids: string[] = req.body.PlatformIds
    let response: PlatformIdResponse[] = []

    await Promise.all(ids.map(async (element) => {
        const result = await db.select().from(users).where(eq(users.platformid, element))
        if (result.length > 0)
        {
            const player = result[0]

            response.push({Platform: 0, PlatformId: element, Player: {
                Id: player?.id || 0,
                Username: player?.username || "UnknownPlayerUhOh",
                DisplayName: player?.displayname || "UnknownPlayerUhOh",
                XP: player?.xp || 0,
                Level: player?.level || 1,
                Reputation: 0, //TODO: Reputation?
                Verified: player?.registered || false,
                Developer: player?.developer || false,
                HasEmail: true,
                CanReceiveInvites: true,
                ProfileImageName: player?.profileImage || "DefaultProfileImage",
                JuniorProfile: false,
                ForceJuniorImages: false,
                PendingJunior: false,
                HasBirthday: true
            }})
        }
    }))

    res.json(response)
})

router.post('/v:version/deleteProfile', async (req: JWTRequest, res) => {
    console.log(req.body)
    const requester = req.auth?.platformId as string

    const player = await db.select().from(users).where(eq(users.id, req.body.PlayerId))

    if (requester != player[0]?.platformid)
        return res.json({ Success: false, Message: "Requester PlatformId does not match account owner." })
    else if (req.body.Password != player[0]?.username)
        return res.json({ Success: false, Message: "Password does not match account name." })
    
    await db.delete(users).where(eq(users.id, req.body.PlayerId))

    return res.json({ Success: true, Message: "" })
})

export default router;