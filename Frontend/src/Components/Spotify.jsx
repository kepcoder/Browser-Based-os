import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice";
import { useState } from "react";

const playlists = [

  {
    title: "Arjit Sing Playlist",
    src: "https://open.spotify.com/embed/playlist/5PvWYnXaNmR5rVdKxRn8iv",
    open: "https://open.spotify.com/playlist/5PvWYnXaNmR5rVdKxRn8iv",
  },
  {
    title: "Diljit Dosanjh Playlist",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0GO2iStOATx",
    open: "https://open.spotify.com/playlist/37i9dQZF1DX0GO2iStOATx",
  },
  {
    title: "Trending Now India",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DXbVhgADFy3im",
    open: "https://open.spotify.com/playlist/37i9dQZF1DXbVhgADFy3im",
  },
  {
    title: "Bollywood Butter",
    src: "https://open.spotify.com/embed/playlist/37i9dQZF1DXd8cOUiye1o2",
    open: "https://open.spotify.com/playlist/37i9dQZF1DXd8cOUiye1o2",
  },
  {
    title: "Popular Punjabi Hits",
    src: "https://open.spotify.com/embed/playlist/3PFVuwuGRZySvvUMAEpkEZ",
    open: "https://open.spotify.com/playlist/3PFVuwuGRZySvvUMAEpkEZ",
  },
  {
    title: "Travel Songs (Hindi Roadtrip)",
    src: "https://open.spotify.com/embed/playlist/3IpDoXyKOPgxJvUJYsagyM",
    open: "https://open.spotify.com/playlist/3IpDoXyKOPgxJvUJYsagyM",
  },
  {
    title: "Old Hindi Melodies (Memories of Golden Era)",
    src: "https://open.spotify.com/embed/playlist/3zGW3iZLZYWa8d3DOxRplp",
    open: "https://open.spotify.com/playlist/3zGW3iZLZYWa8d3DOxRplp",
  },
];

const SpotifyWindow = ({ appName }) => {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(
    (state) => state.mainReducer.openApps[appName]
  );
  const [query, setQuery] = useState("");

  const handleClose = () => dispatch(closeApp(appName));
  const handleMinimize = () => dispatch(toggleMinimize(appName));
  const handleMaximize = () => dispatch(toggleMaximized(appName));

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const url = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
      window.open(url, "_blank");
    }
  };

  const defaultRnd = {
    x: 100,
    y: 100,
    width: 800,
    height: 600,
  };

  if (minimized) return null;

  return (
    <Rnd
      default={defaultRnd}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      disableDragging={maximized}
      enableResizing={!maximized}
      bounds="#desktop-root"
      dragHandleClassName="spotify-drag-handle"
      className="z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.3 }}
        className="spotify-drag-handle w-full h-full bg-white border border-gray-300 rounded-md overflow-hidden shadow-xl"
      >
        {/* Top Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300">
          <div
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            onClick={handleClose}
          />
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
            onClick={handleMinimize}
          />
          <div
            className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
            onClick={handleMaximize}
          />
          <span className="ml-4 text-gray-600 font-medium">Spotify</span>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 px-4 py-2 bg-white border-b"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, albums..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
          >
            Search
          </button>
        </form>

        {/* Embedded Playlists */}
        <div className="h-full overflow-auto p-4 pb-50 bg-[#f6f6f6]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playlists.map((item, i) => (
              <div key={i} className="bg-white rounded shadow-md overflow-hidden flex flex-col gap-2">
                <div className="p-3 text-sm font-semibold">{item.title}</div>
                <iframe
                  src={item.src}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={item.title}
                />
                <a
                  href={item.open}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 p-3 font-bold text-sm text-white underline hover:text-blue-700 transition-all"
                >
                     Listen Full on Spotify
                </a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Rnd>
  );
};

export default SpotifyWindow;
