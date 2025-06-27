import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice"; // assuming closeApp action
import { Rnd } from "react-rnd";

const dummyApps = [
  {
    name: "Vs Code",
    icon: "Vscode_macos.webp",
    description: "Lightweight yet powerful code editor.",
    installed: true
  },
  {
    name: "Spotify",
    icon: "Spotify_macos.webp",
    description: "Edit and share high-res photos instantly.",
    installed: true
  },
  {
    name: "MusicPro",
    icon: "/music.png",
    description: "Stream and manage your playlists seamlessly.",
    installed: false
  },
  {
    name: "WhatsApp",
    icon: "/whatsapp_macos.png",
    description: "Take quick notes and sync across devices.",
    installed: false
  }
];

const AppStoreWindow = ({appName}) => {
  const dispatch = useDispatch();
  const {maximized,minimized} = useSelector((state)=>state.mainReducer.openApps[appName])
  const defaultRnd = {
    x:50,
    y:50,
    width:800,
    height:600
  }


  const handleCloseApp = ()=>{dispatch(closeApp(appName))}
  
  const handleMaximize = ()=>{dispatch(toggleMaximized(appName))}
  
  const handleMinimize = ()=>{dispatch(toggleMinimize(appName))}
  if (minimized) return null
  return (

  <Rnd
  default={defaultRnd}
 position={maximized ? {x:0, y:0} : undefined} 
 size = {maximized ? {width:"100vw", height:"100vh"} : undefined }
 enableResizing={!maximized}
 disableDragging={maximized}
 bounds="#desktop-root"
 dragHandleClassName="Store-drag-handle"
 className="z-50"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 40 }}
      transition={{ duration: 0.3 }}
      className=" Store-drag-handle w-full h-full items-center justify-start gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300 overflow-hidden"
    >
      {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300">
        <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={handleCloseApp}></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" onClick={handleMinimize}></div>
        <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" onClick={handleMaximize}></div>
        <span className="ml-4 text-gray-600 font-medium cursor-pointer">App Store</span>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Apps</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {dummyApps.map((app, i) => (
            <div
              key={i}
              className="bg-white cursor-pointer rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md hover:scale-105 transition"
            >
              <div className="flex items-start gap-4">
                <img src={app.icon} alt={app.name} className="w-12 h-12" />
                <div className="flex-1">
                  <h3 className="text-base font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{app.description}</p>
                  <button
                    className={`mt-2 px-3 py-1 text-sm font-medium rounded ${
                      app.installed
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={app.installed}
                  >
                    {app.installed ? "Installed" : "Install"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
    </motion.div>
  </Rnd>
  );
};

export default AppStoreWindow;
