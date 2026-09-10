import React from 'react'
import SongList from './components/SongList';
import MusicPlayer from './components/MusicPlayer';
import { useState, useEffect } from 'react';
import api from './utils/axios';
import bgImage from './assets/background.jpeg'
import bgImage2 from './assets/bg2.jpeg'

const App = () => {

  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await api.get("/songs")
        setSongs(data.songs)

        // first song
        if (data.songs.length > 0) {
          setCurrentSong(data.songs[0]);
        }
      } catch (error) {
        console.log("Error fetching songs", error)
      }
    };
    fetchSongs();

  }, []);


  return (
    <div className='w-screen h-screen overflow-hidden relative'>
      
     
      {/* backgound */}
      <div className='absolute z-10 w-full h-full bg-cover bg-no-repeat bg-center'
      style={{backgroundImage:`url(${bgImage})`}}>
       <div className='flex flex-col text-6xl md:text-7xl lg:text-9xl gap-2 md:gap-5 text-white font-extrabold absolute 
       right-[5%] md:right-[8%] lg:right-[10%] top-[8%] md:top-[10%]'>

         <h1 className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]' >बैडी</h1>
          <h3 className='drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>प्लेलिस्ट</h3>
       </div>

        {/* Main concent */}
        <div className='z-20 w-full md:w-[50%] h-10 absolute bg-gray-900 flex items-center justify-between rounded-2xl opacity-80
         py-10 bottom-6 md:right-4 border-none'>
       
          <div className=' flex items-center justify-between w-full'>
            {/* <SongList
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          /> */}
          
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
           </div>}

          <MusicPlayer
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
          </div>
        </div>

      </div>


    </div>
  )
}

export default App;