import { useEffect, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { adjustBrightness, showApp } from "../store/slice";
import { useDispatch } from 'react-redux';

const Navbar = () => {


    // Top left Corner menus on hover
  const menus = {
  Finder: ["About", "Preferences", "Services"],
  File:   ["New", "Open…", "Close"],
  Edit:   ["Undo", "Redo", "Copy", "Paste"],
  View:   ["Refresh", "Show Toolbar"],
  Go:     ["Back", "Home", "Downloads"],
  Window: ["Minimize", "Zoom"],
  Help:   ["macOS Help"]
 };
  
  const [openMenu, setOpenMenu] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airplane, setAirplane] = useState(false);
  const [batterySaver, setBatterySaver] = useState(false);
  const [sound, setSound] = useState(60);
  const [brightness, setBrightness] = useState(80);
  const dispatch = useDispatch()


  const controlBritness = (e)=>{
    const britnessVal = Number(e.target.value)
    setBrightness(britnessVal)
    dispatch(adjustBrightness(brightness))
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })
          .replaceAll("/", "-")
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="fixed top-0 left-0 w-full h-8 px-4 flex justify-between items-center text-lg text-white backdrop-blur-md bg-white/30 z-50 select-none">
      {/* Left side menu */}
      <div className="relative flex gap-4 items-center">
        <img src="/logo.webp" alt="logo" className="w-6 h-6" />
        {Object.keys(menus).map(label => (
             <div
           key={label}
           onMouseEnter={() => setOpenMenu(label)}
           onMouseLeave={() => setOpenMenu(null)}
           className="relative"
        >
      <span className="cursor-default hover:text-white/90">{label}</span>

      {/* Dropdown */}
      <AnimatePresence>
        {openMenu === label && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-5 min-w-[140px] bg-zinc-800 text-xs text-white/90
                       rounded-md shadow-lg py-2"
          >
            {menus[label].map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-1 hover:bg-zinc-700 whitespace-nowrap"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
             </div>
          ))}
      </div>     

      {/* Right side icons */}
      <div
        className="flex gap-4 items-center relative"
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
      >
        <span>🔔</span>
        <span>🔋</span>
        <span>{time}</span>
        <span>{date}</span>
        {/* Quick Settings Card */}
        
        {showCard && (
         <AnimatePresence>
         <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.3 }}
         > 
          <div className="absolute right-0 top-6 w-80 bg-zinc-900/95 text-white rounded-2xl shadow-2xl border border-zinc-700 p-5 z-50 animate-fade-in flex flex-col gap-4">
            <div className="flex gap-4 mb-2">
              <button
                onClick={() => setWifi(!wifi)}
                className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all ${
                  wifi ? "bg-blue-600/80" : "bg-zinc-800/80"
                }`}
              >
                📶<span className="text-xs mt-1">WiFi</span>
              </button>
              <button
                onClick={() => setBluetooth(!bluetooth)}
                className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all ${
                  bluetooth ? "bg-blue-600/80" : "bg-zinc-800/80"
                }`}
              >
                🟦<span className="text-xs mt-1">Bluetooth</span>
              </button>
              <button
                onClick={() => setAirplane(!airplane)}
                className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all ${
                  airplane ? "bg-blue-600/80" : "bg-zinc-800/80"
                }`}
              >
                ✈️<span className="text-xs mt-1">Airplane</span>
              </button>
              <button
                onClick={() => setBatterySaver(!batterySaver)}
                className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all ${
                  batterySaver ? "bg-blue-600/80" : "bg-zinc-800/80"
                }`}
              >
                💡<span className="text-xs mt-1">Battery</span>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <span>🔊</span>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={sound}
                  onChange={(e) => setSound(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="w-8 text-right">{sound}</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <span>💡</span>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={brightness}
                  onChange={(e) => controlBritness(e)}
                  className="w-full accent-yellow-400"
                />
                <span className="w-8 text-right">{brightness}</span>
              </label>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="flex items-center gap-2 text-xs opacity-80">
                <span>🔋</span> Battery: 82%
              </span>
              <button className="p-2 rounded-full hover:bg-zinc-800 transition-all">
                <Cog6ToothIcon onClick={()=>dispatch(showApp("Settings"))}  className="w-6 h-6 text-zinc-300" />
              </button>
            </div>
          </div>
         </motion.div> 
         </AnimatePresence> 
        )}
      </div>

    </div>
  );
};

export default Navbar;
