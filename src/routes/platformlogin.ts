import express from 'express';
import Jwt from 'jsonwebtoken';
import { create_account, find_accounts } from '../db/datamanager';
import SteamUser from 'steam-user';
import gen_name from '../static/NameGen';

const router = express.Router();

//Login
router.post('/v:version', async (req, res) => {
    //PlayerId will not be returned if this is a new account.
    try {
        const authParams = req.body?.AuthParams;
        if (!authParams || typeof authParams !== 'string')
            return res.status(400).json({ Error: 'Missing AuthParams' });

        const parsed = JSON.parse(authParams);
        const ticket = parsed?.Ticket;
        if (!ticket || typeof ticket !== 'string')
            return res.status(400).json({ Error: 'Missing Steam ticket' });

        const buffer = Buffer.from(ticket, 'hex');
        const steam = SteamUser.parseAppTicket(buffer);

        if (!steam || steam.isvalid === false)
            return res.status(400).json({ Error: 'Invalid Steam ticket' });

        //Create an account if no PlayerId was provided
        if (!req.body.PlayerId)
        {
            let account = await create_account(gen_name(), req.body.PlatformId)
            if (!account.success)
                return res.sendStatus(500)
            
            req.body.PlayerId = account.id;
        }

        const jwt_data = 
        {
            sub: req.body.PlayerId,
            platformId: req.body.PlatformId
        }

        const token = Jwt.sign(jwt_data, process.env.JWT_SECRET || 'development-secret', { expiresIn: '12h' });

        return res.json({ Token: token, PlayerId: req.body.PlayerId, Error: "" });
    } catch (error) {
        console.error('platformlogin failed:', error);
        return res.status(400).json({ Error: 'Invalid AuthParams' });
    }
});

//Get current list of accounts.
//Empty array (or single entry) triggers /api/platformlogin/v*/ to create/login to a single account.
router.post('/v:version/profiles', async(req, res) => {
	if (!req.body) return res.sendStatus(400);

	const platform = req.body.Platform; //Only Steam is ever checked for in this server.
	const platformid = req.body.PlatformId;

	const result = await find_accounts(platformid)

	res.json(result)
});

export default router;