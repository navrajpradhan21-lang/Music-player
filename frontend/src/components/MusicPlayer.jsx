import React from 'react'
import { RiRewindStartFill } from "react-icons/ri";
import { FaFastForward } from "react-icons/fa";
import { MdPauseCircle } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';

const MusicPlayer = ({ songs, currentSong, setCurrentSong }) => {

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);


    // load new song
    useEffect(()=>{
        if(!currentSong) return
        audioRef.current.src = currentSong.audioUrl;
        audioRef.current.load();

        setCurrentTime(0)
        setIsPlaying(false)

        // automatically play song
        audioRef.current.play()
        .then(()=>{
            setIsPlaying(true)
        })
        .catch((error)=>{
            console.log("Autoplay blocked:",error);
            setIsPlaying(false);
        });
    },[currentSong])


    // play pause
    const handlePlayPause = () => {

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true)
        }
    }
    // previous Song
    const handlePrevious = () => {

        const currentIndex = songs.findIndex(
            song => song._id === currentSong._id
        );

        if (currentIndex > 0) {
            setCurrentSong(songs[currentIndex - 1]);
        }

    };

    // next song 
    const handleNext = () => {
        // current song ka index
        const currentIndex = songs.findIndex(
            song => song._id === currentSong._id
        )

        if (currentIndex < songs.length - 1) {
            setCurrentSong(songs[currentIndex + 1]);
        }else{
            //Playlist finished 
            // Start again from first song
            setCurrentSong(songs[0])
        }
    }
    // song end 
    const handleEnd = ()=>{
        handleNext()
    }
    //update progress

    const handleTimeUpdate = () => {

        setCurrentTime(audioRef.current.currentTime);
    };


    // get audio totalduration
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    }

    //Formate seconds to minutes 
    const formateTime = (time) => {

        if (!time) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;

    }
    // Seek / Progress bar
    const handleSeek = (e) => {

        const newTime = Number(e.target.value);

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);

    };

    return (
        <div className='text-white w-[50%] mr-5 
        flex flex-col items-center  '>
            <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnd}
             />


            {/* controll */}
            <div className='flex gap-2 px-4 '>
                <button onClick={handlePrevious}><RiRewindStartFill size={25} /></button>
                <button onClick={handlePlayPause} >
                    {isPlaying ? <MdPauseCircle size={30} /> : <FaCirclePlay size={30} />}
                </button>
                <button onClick={handleNext}><FaFastForward size={25} /></button>
            </div>

            <div className=' flex items-center gap-2 w-full'>
                <span>
                    {formateTime(currentTime)}
                </span>
                <input 
                type="range" 
                min="0"
                max = {duration || 0}
                value = {currentTime}
                onChange={handleSeek}
                className='w-full cursor-pointer '
                />

                <span className='text-md'>
                    {formateTime(duration)}
                </span>



            </div>




        </div>
    )
}

export default MusicPlayer;