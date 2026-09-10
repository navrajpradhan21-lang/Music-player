import express from 'express'
import dotenv from "dotenv"
import cors from "cors"

import connectDB from './config/db.js'
import songRoutes from './routes/song.routes.js'


dotenv.config()


const app = express()

// Middleware
app.use(cors())
app.use(express.json());

// db 
connectDB();

// test route
app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Music Player API is running"
    });

});

// Song routes
app.use("/api/songs", songRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

}); 