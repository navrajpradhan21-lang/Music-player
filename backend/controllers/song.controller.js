
import Song from "../models/song.model.js";
import cloudinary from "../config/cloudinary.js";


// uploadSongs 

export const uploadSong = async(req,res)=>{
    try{
        let{title,artist,order} = req.body

        //check the text field

        if(!title || !artist || !order){
            return res.status(400).json({
                success:"false",
                message:"Title artist and order are required"
            });

        }
        // check files 
        if(!req.files?.audio ||!req.files?.coverImage){ 
            return res.status(400).json({
                success:false,
                message:'Audio and cover image are required'
            });

        }
        const audioFile = req.files.audio[0];
        const coverFile = req.files.coverImage[0];
        
        // upload to cloudinary

        const audioUpload  = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type:"video",
                    folder:"music-player/audio"
                },
                (error,result)=>{
                    if(error){
                        reject(error)
                    }else{
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
                    folder: "music-player/covers"
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



        // save data to Mongodb

        const song = await Song.create({
            title,
            artist,
            order:Number(order),
            audioUrl:audioUpload.secure_url,
            coverImage:coverUpload.secure_url

        });

        res.status(201).json({
            success:true,
            message:"Song uploaded successfully",
            song
        });


    }catch(error){
        console.log("Upload song error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to upload song",
            error: error.message
        })
    }
}






// get songs
export const getSong = async(req, res)=>{
    try{
        const songs = await Song.find().sort({order:1})
        res.status(200).json({
            success:true,
            songs
        })

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:"Failed to fetch song",
            error:error.message
        });
    }
}

// 