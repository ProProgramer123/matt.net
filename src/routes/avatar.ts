import express from 'express';
import type { Request as JWTRequest } from 'express-jwt';

import { eq } from "drizzle-orm";
import db from '../db/database'
import { users } from '../db/schema';

const router = express.Router();

router.get('/v:version', async (req: JWTRequest, res) => {
    //RecNet.MHFLMAJNGID.Deserialize
    const player_id = req.auth?.sub;

	if (!player_id) 
		return res.sendStatus(400)

    const result = await db.query.users.findFirst({where: (users, {eq}) => eq(users.id, parseInt(player_id))})

	if (!result)
		return res.sendStatus(400)

	return res.json(result.avatar);
});

router.post('/v:version/set', async (req: JWTRequest, res) => {
    const player_id = req.auth?.sub;

	if (!player_id) 
		return res.sendStatus(400)

    if (!req.body)
        return res.sendStatus(400)

    const player_data = await db.query.users.findFirst({where: (users, {eq}) => eq(users.id, parseInt(player_id))})

	if (!player_data)
		return res.sendStatus(400)

    await db.update(users).set({ avatar: req.body }).where(eq(users.id, parseInt(player_id)))

    res.json(req.body);
});

router.get('/v:version/items', (req, res) => {
    res.json([]); //TODO: Reverse engineer this.
});

router.get('/v:version/gifts', (req, res) => {
    res.json([]); //TODO: Reverse engineer this.
});


export default router;