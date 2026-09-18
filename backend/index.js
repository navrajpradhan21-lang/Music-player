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

// Allow local development plus the deployed frontend. Add additional origins in
// the hosting dashboard with CLIENT_ORIGINS as a comma-separated list.
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://music-player-mocha-nine.vercel.app",
    ...((process.env.CLIENT_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean))
];

app.use(cors({
    origin(origin, callback) {
        // Requests without an Origin header (for example health checks) are safe.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS origin is not allowed"));
    }
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
