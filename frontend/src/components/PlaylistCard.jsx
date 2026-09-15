const PlaylistCard = ({ playlist, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex  w-55 shrink-0 flex-col items-center justify-center rounded-2xl
             bg-white/15 p-3 text-center text-white shadow-lg backdrop-blur-sm
             transition duration-300 hover:scale-110 hover:bg-white/30
             hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
    >
      <img
        src={playlist.PlaylistcoverImage}
        alt={playlist.name}
        className=" w-full h-55 object-cover rounded-2xl transition duration-300 group-hover:rotate-10"
      />
      <div className="p-4">
        <h2 className="mt-1 w-full truncate text-lg font-semibold">{playlist.name}</h2>
      </div>
    </button>
  )
}

export default PlaylistCard
