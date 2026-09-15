import express from "express"
import upload from "../middleware/multer.js";
import { getallPlaylist,getPlaylistSlug,createPlaylist } from "../controllers/playlist.controller.js"


const playlistRoutes = express.Router()



// create playlist

playlistRoutes.post('/',upload.single("PlaylistcoverImage"),createPlaylist);

// get all the playlist 
playlistRoutes.get('/',getallPlaylist);

// get the playlists by slug

playlistRoutes.get('/:slug',getPlaylistSlug);

export default playlistRoutes;

/*
POST   /api/playlists
GET    /api/playlists
GET    /api/playlists/:slug
*/