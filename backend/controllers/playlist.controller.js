
import cloudinary from "../config/cloudinary.js";
import Playlist from "../models/playlist.model.js";
import { redisClient } from "../config/redis.js";




// creating all the playlist
export const createPlaylist = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            mood,
        } = req.body

        try {
            // delete the previously stored cache 
            await redisClient.del("playlists:all");
        }catch(redisError){
            console.log("Redis write failed:", redisError.message);
        }


        // checking if the playlist exists 

        const existingplaylist = await Playlist.findOne({ slug });
        if (existingplaylist) {
            return res.status(400).json({
                success: false,
                message: "Playlist already exists"
            });

        }
        // checking files 
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Cover Image is required"
            });
        }

        const coverFile = req.file

        // upload on cloudinary
        const coverUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "moodify/playlist-cover"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }

            );
            stream.end(coverFile.buffer)
        });

        // create the playlist
        // save to mongodb

        const playlist = await Playlist.create({
            name,
            slug,
            description,
            mood,
            PlaylistcoverImage: coverUpload.secure_url
        });

        res.status(201).json({
            success: true,
            message: "Playlist Created successfully",
            playlist

        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
}

// get all the playlist 

export const getallPlaylist = async (req, res) => {
    try {

        const cacheKey = "playlists:all";

        //REDIS
        try {
            //1. Check Redis first 
            const cachedPlaylists = await redisClient.get(cacheKey);


            if (cachedPlaylists) {
                console.log("redis cache Hit");
                return res.status(200).json({
                    success: true,
                    playlists: JSON.parse(cachedPlaylists)
                });
            }
            // 2. redis dont have the data 
            console.log("redis cache MISS")

        } catch (redisError) {
            console.log(
                "Redis read Failed",
                redisError.message
            );
        }
        // Mongo Db is the fallback 
        // Get Data from MongoDb
        const playlists = await Playlist.find().sort({ createdAt: -1 })

        // Agre koi playlist nahi hai toh empty list return karega
        // Try saving in redis
        try {
            // Store MOngodb results in Redis
            await redisClient.set(
                cacheKey,
                JSON.stringify(playlists),
                {
                    EX: 3600 // 1 hs
                }
            )

        } catch (redisError) {
            console.log(
                "Redis read Fail",
                redisError.message
            )
        }

        // send response
        res.status(200).json({
            success: true,
            playlists
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// get playlist by slug

export const getPlaylistSlug = async (req, res) => {
    try {

        const { slug } = req.params;

        const playlist = await Playlist.findOne({ slug });

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "NO playlist found"
            });
        }

        res.status(200).json({
            success: true,
            playlist
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
