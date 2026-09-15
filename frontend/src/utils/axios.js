import axios from "axios"

const api = axios.create({
     baseURL:import.meta.env.VITE_API_URL
    //baseURL:'http://localhost:5000/api'

})




export const getPlaylists = async()=>{
    const response = await api.get(
        `/playlists`
    );
    return response.data;
}

export const getSongsByPlaylist = async(slug)=>{
    const response = await api.get(
        `/songs/playlist/${slug}`
    );
    return response.data
}

export default api;
