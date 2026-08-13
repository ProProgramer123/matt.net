import express from 'express';
import type { Request as JWTRequest } from 'express-jwt';

import { eq } from "drizzle-orm";
import db from '../db/database'
import { users } from '../db/schema';

type PlayerSetting = {Key: string, Value: string}

const router = express.Router();

router.get('/v:version', async (req: JWTRequest, res) => {
	const player_id = req.auth?.sub;

	if (!player_id) 
		return res.sendStatus(400)

	const result = await db.query.users.findFirst({where: (users, {eq}) => eq(users.id, parseInt(player_id))})

	if (!result)
		return res.sendStatus(400)

	res.json(result.settings);
});

router.post('/v:version/set', async (req: JWTRequest, res) => {
	const player_id = req.auth?.sub;
	const incoming_setting = req.body as PlayerSetting

	if (!player_id) 
		return res.sendStatus(400)

	const player_data = await db.query.users.findFirst({where: (users, {eq}) => eq(users.id, parseInt(player_id))})

	if (!player_data)
		return res.sendStatus(400)

	let settings = player_data.settings as Array<PlayerSetting>

	const index = settings.findIndex(item => item.Key === incoming_setting.Key)

	if (index !== -1)
		settings[index] = incoming_setting
	else
		settings.push(incoming_setting)

	await db.update(users).set({ settings: settings }).where(eq(users.id, parseInt(player_id)))

	return res.json(settings);
});

export default router;