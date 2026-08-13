import express from 'express';
import path from 'path'

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