import React from 'react'

const SongList = ({songs, currentSong, setCurrentSong}) => {
  return (
    <div className='text-white flex items-center justify-start '>
        
        {songs.map((song)=>(
            
            <div className='flex items-center gap-1' key={song._id} onClick={()=>setCurrentSong(song)} >
                <img className='w-20 h-full rounded-2xl' src={song.coverImage} alt={song.title} />

                <div className='flex items-center flex-col gap-2 text-[12px]'>
                    <h3>{song.title}</h3>
                    <p className=''>{song.artist}</p>

                </div>

            </div>
          
        ))}

    </div>
  );
};

export default SongList;
