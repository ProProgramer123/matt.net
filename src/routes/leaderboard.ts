import express from 'express';
import type { Request as JWTRequest } from 'express-jwt';

const router = express.Router();

//TODO: Make leaderboards work.
//Sending dummy data rn
router.post('/', async (req: JWTRequest, res) => {
    // {PlayerId: 1, Count: 67, Order: 1}
    // order is the number on the left side

    const data = {
        GlobalOverall: [],
        GlobalPeriodic: [],
        FriendsOverall: [],
        FriendsPeriodic: [],
        NextResetUTC: 0
    }
    
    res.json(data)
});

export default router;