import express from 'express'
import dotenv from "dotenv"
import cors from "cors"

import connectDB from './config/db.js'
import songRoutes from './routes/song.routes.js'
import playlistRoutes from './routes/playlist.routes.js'

import { connectRedis } from './config/redis.js'

dotenv.config()


const app = express()

// MIDDLEWARE

// (Front end)
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://music-player-mocha-nine.vercel.app"
    ]
}));

// to read json
app.use(express.json());

// db 
connectDB();

// redis 
connectRedis();

// test route (Health_)
app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Music Player API is running"
    });

});

// Song routes
app.use("/api/songs", songRoutes);
app.use('/api/playlists',playlistRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

}); 