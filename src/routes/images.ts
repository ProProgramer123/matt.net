import express from 'express';
import path from 'path'
import type { Request as JWTRequest } from 'express-jwt';
import multer from 'multer';

import { eq } from "drizzle-orm";
import db from '../db/database'
import { users } from '../db/schema';
import { send_ws_message, WebsocketResponses } from '../websocket';
import { get_account_data } from '../db/datamanager';

const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../../public/image/`))
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomUUID() + ".png")
    }
    })
})

const router = express.Router();

router.get('/v:version/named', async (req, res) => {
    if (Bun.env.USE_NAMED_IMAGES == "false")
        return res.sendStatus(404)

    const image = req.query.img
    if (!image)
        return res.sendStatus(404)

    const filePath = path.join(__dirname, `../../public/named/${image}.png`)
    res.sendFile(filePath)
});

//rec room shouldve made this part of the players route instead of images.
//that's what i wouldve done differently :p
router.post('/v:version/profile', 
upload.fields([{name: 'image', maxCount: 1}, {name: 'altimage', maxCount: 1}]), 
async (req: JWTRequest, res) => {
    // @ts-ignore: This works but typescript doest think it does.
    const fname = req.files?.['image'][0].filename;

    const player_id = parseInt(req.auth?.sub as string)
    await db.update(users).set({ profileImage: fname.slice(0, -4) }).where(eq(users.id, player_id))

    //webhook does the rest of the lifting
    const data = await get_account_data(player_id) as RecRoomPlayer
    send_ws_message(player_id, {Id: WebsocketResponses.SubscriptionUpdateProfile, Msg: data})

    //rr doesnt have any callback for this request but we tell it "good job" anyways.
    res.sendStatus(200)
});

//sharecam polaroids
router.post('/v:version/uploadtransient', 
upload.fields([{name: 'image', maxCount: 1}, {name: 'altimage', maxCount: 1}]), 
async (req: JWTRequest, res) => {
    // @ts-ignore: This works but typescript doest think it does.
    const fname = req.files?.['image'][0].filename;

    res.json({ImageName: fname.slice(0, -4)})
});

//sharecam saved images
router.post('/v:version/uploadsaved', 
upload.fields([{name: 'image', maxCount: 1}, {name: 'altimage', maxCount: 1}]), 
async (req: JWTRequest, res) => {
    // @ts-ignore: This works but typescript doest think it does.
    const fname = req.files?.['image'][0].filename;

    res.json({ImageName: fname.slice(0, -4)})
});

//sharecam image links
//not accurate as emails arent actually logged.
router.post('/v:version/sendlink', (req: JWTRequest, res) => {
    send_ws_message(parseInt(req.auth?.sub as string), 
    {
        Id: WebsocketResponses.MessageReceived, 
        Msg: {
            Id: -1,
            FromPlayerId: 1,
            SentTime: Date.now(),
            Type: 100, //IMGPDLHMJEE.FCHPDJPIBHM
            Data: `You can view your image here: ${Bun.env.CDN_BASE_URI || req.url + "/cdn"}/image/${req.body.ImageName}.png`
        }
    })

    res.sendStatus(200)
})

export default router;