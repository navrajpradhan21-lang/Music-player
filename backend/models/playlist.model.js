import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true
    },
    description:{
        type:String,
        trim:true
    },
    mood:{
        type:String,
        required:true,
        trim:true
    },

    PlaylistcoverImage:{
        type:String,
        required: true
    }
},{
    timestamps:true
});


const Playlist = mongoose.model("Playlist",playlistSchema);

export default Playlist;
