import Song from "../models/song.model.js";

import cloudinary from "../config/cloudinary.js";
import Playlist from "../models/playlist.model.js";
import { redisClient } from "../config/redis.js";


// uploadSongs 

export const uploadSong = async (req, res) => {
    try {
        let { title, artist, order, playlist } = req.body

        //check the text field
        if (!title || !artist || !order || !playlist) {
            return res.status(400).json({
                success: "false",
                message: "Title artist playlist and order are required"
            });
        }


        // checking playlist exists

        const existingPlaylist = await Playlist.findOne({
            slug: playlist

        });

        if (!existingPlaylist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }



        // check files 
        if (!req.files?.audio || !req.files?.coverImage) {
            return res.status(400).json({
                success: false,
                message: 'Audio and cover image are required'
            });

        }
        const audioFile = req.files.audio[0]; // audio file 
        const coverFile = req.files.coverImage[0]; // of song 



        // upload to cloudinary

        const audioUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "moodify/audio"
                },
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(audioFile.buffer)
        })


        const coverUpload = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "moodify/song-covers"
                },

                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );

            stream.end(coverFile.buffer);
        });

        // create 
        // save data to Mongodb

        const song = await Song.create({
            title,
            artist,
            order: Number(order),
            audioUrl: audioUpload.secure_url,
            coverImage: coverUpload.secure_url,
            playlist: existingPlaylist
        });

        try{
            // deleting the cache stored in redis 
            await redisClient.del(`playlist:songs:${playlist}`)
        }catch(redisError){
            console.log("redis read Failed",redisError.message)
        }


        res.status(201).json({
            success: true,
            message: "Song uploaded successfully",
            song
        });


    } catch (error) {
        console.log("Upload song error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to upload song",
            error: error.message
        })
    }
}




// get songs by playlist 

export const getSongByPlaylist = async (req, res) => {
    try {

        const { slug } = req.params;


        const cacheKey = `playlist:songs:${slug}`

        try {
            //1. Checking Redis first 
            const cachedSongs = await redisClient.get(cacheKey)

            if (cachedSongs) {
                console.log("redis cache Hit")
                return res.status(200).json(
                     JSON.parse(cachedSongs)
                )
            }
            // if redis dont have the data 
            console.log("redis cache MISS")

        } catch (redisError) {
            console.log("redis read Fail", redisError.message)

        }


        // find playlist
        const playlist = await Playlist.findOne({
            slug
        })

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not Found"
            });

        }
        // Find songs belonging to the playlist

        const songs = await Song.find({
            playlist: playlist._id
        })
            .sort({ order: 1 });

        // 4. Create the response object
        const responseData = {
            success: true,
            playlist: playlist.name,
            songs
        };

        try {

            // Store the MongoDb results in Redis 
            await redisClient.set(
                cacheKey,
                JSON.stringify(responseData),
                {
                    EX: 3600 //1 hr
                }
            )

        }catch(redisError){
            console.log("redis read Fail",redisError.message)
        }

        // send response

        res.status(200).json(responseData);


    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "Failed to fetch song",
            error: error.message
        });
    }
};


