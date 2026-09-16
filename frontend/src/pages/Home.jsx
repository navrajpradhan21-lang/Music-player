
import { useState, useEffect, useRef } from 'react'
import { getPlaylists } from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/home.jpeg'
import bgMobile from '../assets/home2.jpeg'
import bg2 from '../assets/page2.jpeg'
import bg2Mobile from '../assets/page2M.jpeg'
import { TypeAnimation } from 'react-type-animation'

import PlaylistCard from '../components/PlaylistCard'

const Home = () => {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)

  // As soon as the website renders fetch data
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);

        const data = await getPlaylists();

        setPlaylists(data.playlists)

      } catch (error) {
        console.log("error fetching playlists",error)
      }finally{
        setLoading(false)
      }
    };
    fetchPlaylists();
  }, [])

  const playlistContainerRef = useRef(null)
  // Auto Scroll effect
  useEffect(() => {
    const container = playlistContainerRef.current
    if (!container) return
    const interval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth"
        })
      } else {
        container.scrollBy({
          left: 300,
          behavior: "smooth"
        })
      }
    }, 3000)

    return () => clearInterval(interval)

  }, [])


  const navigate = useNavigate()

  const handlePickMood = () => {
    document.getElementById("playlists")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div>

      {/* Hero Section */}
      <div className='w-full h-screen relative'>

        {/*desktop View  */}
        <div className='absolute w-full h-full inset-0 bg-center bg-cover bg-no-repeat md:block '
          style={{ backgroundImage: `url(${bg})` }}>

          {/* Mobile background */}
          <div
            className='absolute inset-0 bg-center bg-cover bg-no-repeat block md:hidden'
            style={{ backgroundImage: `url(${bgMobile})` }}
          />

          {/* Title of landing page */}
          <div className='absolute top-[10%] left-[15%] text-6xl sm:top-[25%] sm:left-[10%] md:top-[2%] 
          md:left-[15%]'>
            <h1 className=" font-['Pacifico']
            text-7xl
            md:text-8xl
            lg:text-9xl
            tracking-wide
            bg-linear-to-r
            from-yellow-200
            via-red-100
            to-white
            bg-clip-text
            text-transparent
            drop-shadow-[0_0_15px_rgba(217,110,239,0.4)]"
            >Moodify</h1>
          </div>
          {/* text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold */}
          {/* Button */}
          <div className='absolute top-[32%] right-[8%] sm:top-[32%] sm:right-[10%] md:top-[30%] md:right-[15%]'>
            <button
              onClick={handlePickMood}
              className='bg-linear-to-r from-red-600 via-orange-400 to-yellow-200
                      px-5 py-3 
                      sm:px-7 sm:py-4 
                      md:px-10 md:py-5
                      text-base sm:text-lg md:text-2xl
                      rounded-2xl md:rounded-3xl
                      text-white
                      cursor-pointer
                      hover:scale-110
                      hover:opacity-80
                      transition duration-300'>
              Pick Your Mood
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <section
        id='playlists'
        className='relative min-h-screen text-white px-10 py-20'
      >
        {/*desktop View  */}
        <div className='absolute w-full h-full inset-0 bg-center bg-cover bg-no-repeat md:block'
          style={{ backgroundImage: `url(${bg2})` }}>
        </div>

        {/*Mobile View */}
        <div className='absolute w-full h-full inset-0 bg-center bg-cover bg-no-repeat md:hidden'
          style={{ backgroundImage: `url(${bg2Mobile})` }}>
        </div>

        {/* content */}
        <div className='relative z-10'>
          <div className=' text-2xl md:text-4xl font-bold text-center text-white
          drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'>
            <TypeAnimation
              sequence={["Your Mood Today ?", 2000, "Pick your Playlist", 2000]}
              speed={10}
              repeat={Infinity}
              cursor="|"
            />
          </div>
          {/* Playlist card */}
          { loading?(
            <div className="flex items-center justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
             </div>
          ):(
            <div className='flex justify-center'>
              <div className='flex items-center justify-start mt-10  gap-10 w-[90%] md:w-[50%]
                overflow-auto pb-4 snap-start px-3 scrollbar-none
                 snap-x snap-mandatory'
              ref={playlistContainerRef}>
              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  playlist={playlist}
                  onClick={() => navigate(`songs/playlist/${playlist.slug}`)}
                />
              ))}

              </div>
         
            </div>
          )}

        </div>
      </section>
    </div>
  )
}

export default Home;
