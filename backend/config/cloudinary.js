import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
       
});
console.log("Cloudinary cloud:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API key loaded:", !!process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary secret loaded:", !!process.env.CLOUDINARY_API_SECRET);


export default cloudinary;
