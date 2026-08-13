import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/img/:imagename', async (req, res) => {
    const filePath = path.join(__dirname, `../../public/image/${req.params.imagename}.png`)
    res.sendFile(filePath)
});

router.get('/img/alt/:imagename', async (req, res) => {
    const filePath = path.join(__dirname, `../../public/image/${req.params.imagename}.png`)
    res.sendFile(filePath)
});

export default router;