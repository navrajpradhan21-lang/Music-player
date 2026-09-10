import express from 'express'
import upload from '../middleware/multer.js';

import { getSong,uploadSong } from '../controllers/song.controller.js';



const songRoutes = express.Router();


// upload Song 
songRoutes.post('/upload',upload.fields([
    {
        name: "audio",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
    ]),
    uploadSong
)

// get all song

songRoutes.get('/',getSong);

export default songRoutes
