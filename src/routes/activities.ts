import express from 'express';
import { charades_words } from '..';

const router = express.Router();

router.get('/charades/v:version/words', async (req, res) => {
    return res.json(charades_words)
});

export default router;