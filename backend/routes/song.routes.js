import express from 'express'
import upload from '../middleware/multer.js';

import { getSongByPlaylist,uploadSong } from '../controllers/song.controller.js';



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

songRoutes.get('/playlist/:slug',getSongByPlaylist);

export default songRoutes;

/*
POST /api/songs/upload

GET /api/songs/playlist/:slug
*/
