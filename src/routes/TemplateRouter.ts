import express from 'express';
import type { Request as JWTRequest } from 'express-jwt';

const router = express.Router();

router.get('/', async (req: JWTRequest, res) => {
    //Stuff goes here.
});

export default router;