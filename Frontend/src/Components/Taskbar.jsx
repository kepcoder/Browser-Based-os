import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showApp, toggleMaximized } from "../store/slice";
import { motion } from "framer-motion";

const Taskbar = () => { 

const openApps = useSelector((state)=>state.mainReducer.openApps)
const {dockItems} = useSelector((state)=>state.mainReducer)

  const [hovered, setHovered] = useState(null);
  const dispatch = useDispatch()


  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 flex items-end gap-4 bg-black/20 backdrop-blur-md rounded-2xl shadow-lg z-50 border border-white/20">
      {dockItems.map((item, index) => {
        const handleMaximized = ()=>{ toggleMaximized(item.name)}
        const isMinimized = openApps[item.name]?.minimized
       return(
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => dispatch(showApp(item.name))}
        >
          <img
            src={item.icon}
            alt={item.name}
            className={`transition-all duration-200 ${
              hovered === index ? "scale-150" : "scale-100"
            } w-15 h-15`}
          />
          <span className="text-xs text-white mt-1">{item.name}</span>
           {item.name === "Folder" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
           {item.name === "AppStore" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
           {item.name === "Settings" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
           {item.name === "Notes" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
           {item.name === "Safari" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
           {item.name === "Finder" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
          {item.name === "Spotify" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
          {item.name === "Terminal" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
          {item.name === "Vscode" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
          {item.name === "Camera" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}
          {item.name === "Binance" && isMinimized && (
             <div className="absolute bottom-[2px] w-10 h-1 bg-white/80 rounded-full" />
           )}

           {isMinimized && hovered === index && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 20 }}         
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
              <div onClick={handleMaximized} className="absolute bottom-16 w-48 h-28 bg-white/90 rounded-lg shadow-lg p-2 text-sm text-black z-50 transition-all duration-300">
                <p className="font-medium">{item.name}</p>
                <div className="mt-2 text-gray-600">Click To Open Your MiniMize App</div>
              </div>
              </motion.div>
            )}
        </div>
       )
})}
    </div>
  );
};

export default Taskbar;
