import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        artist: {
            type: String,
            required: true,
            trim: true
        },

        audioUrl: {
            type: String,
            required: true
        },

        coverImage: {
            type: String
        },
           order: {
            type: Number,
            required: true
        },
        playlist:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Playlist",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Song = mongoose.model("Song", songSchema);

export default Song;