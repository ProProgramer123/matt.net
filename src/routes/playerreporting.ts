import express from 'express';
import type { Request as JWTRequest } from 'express-jwt';

const router = express.Router();

router.get('/v:version/moderationBlockDetails', (req: JWTRequest, res) => {
	const player_id = req.auth?.sub;
	
	res.json({
		ReportCategory: 0,
		Duration: 0,
		GameSessionId: 0,
		Message: ""
	} as ModerationBlockDetails)
});

export default router;