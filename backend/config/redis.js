import {createClient} from "redis";

const redisClient = createClient({
    url:process.env.REDIS_URL
});

redisClient.on("error",(err)=>{
    console.log('Redis Client Error:',err)
});

const connectRedis = async()=>{
    try{
        await redisClient.connect(); // connects Node.js to redis server
        console.log("Redis connected")
    }catch(error){
        console.log(
            "redis connection error:",
            error.message
        );
    }

};
export{
    redisClient,
    connectRedis
};

