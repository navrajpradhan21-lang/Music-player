import React, { useEffect } from 'react'

import SongList from '../components/SongList'
import MusicPlayer from '../components/MusicPlayer'
import api from '../utils/axios'
import bg from '../assets/lovebg.jpeg'
import bg2 from '../assets/lovebgM.jpeg'

import { useState } from 'react'

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Page2 = () => {
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(()=>{
    const fetchSongs = async()=>{
      try{
        const {data} = await api.get("/songs")
          setSongs(data.songs)

          // first Song
          if(data.songs.lenght>0){
            setCurrentSong(data.songs[0]);
          }

      }catch(err){
        console.log('Error fetching songs',err)

      }
    };
    fetchSongs();
  },[]);

  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen overflow-hidden relative'>

      {/* Background desktop view */}
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className='absolute w-full h-full bg-cover bg-center inset-0 md:block'>
      </div>

      {/*Mobile View */}
      <div className='absolute w-full h-full inset-0 bg-center bg-cover bg-no-repeat md:hidden'
        style={{ backgroundImage: `url(${bg2})` }}>
      </div>


      {/* Arrow to go back */}
      <div className='flex text-white absolute top-15 left-4 md:left-20 text-2xl md:text-5xl w-20 h-10 md:w-20 md:h-20 bg-orange-400/40 justify-center items-center rounded-full
              shadow-lg cursor-pointer hover:bg-orange-500/50 hover:scale-120 hover:shadow-2xl'>
        <FaArrowLeft onClick={() => navigate('/')} />
      </div>

      {/* Title */}
      <div className='flex flex-col text-4xl md:text-7xl lg:text-7xl gap-2 md:gap-5 text-white/90 font-extrabold absolute 
       right-[4%] md:right-[8%] lg:right-[10%] top-[7%] md:top-[10%]'>

        <h1 className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>Lovey-Dovey</h1>
        <h3 className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>प्लेलिस्ट</h3>
      </div>

     {/* MainContent */}
     <div className='z-20 w-full md:w-[50%] h-10 absolute bg-gray-900 flex items-center justify-between rounded-2xl opacity-80
         py-10 bottom-6 md:right-4 border-none'>

      <div className=' flex items-center justify-between w-full'>
        {currentSong&&
          <div className='flex gap-3 items-center text-white ml-2 '>
            <img className='w-16 h-16 object-cover rounded-xl'
            src={currentSong.coverImage} 
            alt={currentSong.title} />
            <div>
              <h3 className='font-bold'>
                {currentSong.title}
              </h3>
              <p className='text-gray-400 text-sm'>{currentSong.artist}</p>
            </div>
           </div>
        }
        <MusicPlayer
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
      </div>
     </div>

    </div>
  )
}

export default Page2