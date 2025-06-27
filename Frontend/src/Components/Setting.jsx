import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice";
import { useState } from "react";
import { Rnd } from 'react-rnd';


const settingsItems = [
  { name: "General", icon: "⚙️", content: "Appearance, Language, and more" },
  { name: "Network", icon: "🌐", content: "Wi-Fi, Ethernet, VPN" },
  { name: "Privacy", icon: "🔒", content: "Permissions and Tracking" },
  { name: "Display", icon: "🖥️", content: "Resolution and Brightness" },
  { name: "Sound", icon: "🔊", content: "Output and Input Devices" },
];

const SettingsWindow = ({ appName }) => {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(
    (state) => state.mainReducer.openApps[appName]
  );

  const [selected, setSelected] = useState("General");
const defaultRnd ={
  x:50,
  y:50,
  width:700,
  height:600
}
  const handleClose = () => dispatch(closeApp(appName));
  const handleMinimize = () => dispatch(toggleMinimize(appName));
  const handleMaximize = () => dispatch(toggleMaximized(appName));

  return (

    <Rnd
     default={defaultRnd}
     position={maximized ? {x:0, y:0} : undefined}
     size={maximized ? {width:"100vw", height:"100vh"}: undefined}
     disableDragging={maximized}
     enableResizing={!maximized}
     bounds="#desktop-root"
     dragHandleClassName='handle-setting-drag'
     className="z-50"
    >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 40 }}
      transition={{ duration: 0.3 }}
      className="handle-setting-drag w-full h-full bg-white shadow-xl border border-gray-300 overflow-hidden z-50 rounded-xl"
    >
        {/* Title Bar */}
        <div className="flex items-center justify-start gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={handleClose}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" onClick={handleMinimize}></div>
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" onClick={handleMaximize}></div>
          <span className="ml-4 text-gray-600 font-medium cursor-pointer">Settings</span>
        </div>

        {/* Body */}
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            {settingsItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelected(item.name)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 text-sm
                  ${selected === item.name ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selected} Settings</h2>
            <div className="text-sm text-gray-600 leading-relaxed">
              {selected === "General" && (
                <div>
                  <p>Choose theme: Light / Dark</p>
                  <p>Change language</p>
                </div>
              )}
              {selected === "Network" && (
                <div>
                  <p>Wi-Fi networks</p>
                  <p>VPN settings</p>
                </div>
              )}
              {selected === "Privacy" && (
                <div>
                  <p>App permissions</p>
                  <p>Location services</p>
                </div>
              )}
              {selected === "Display" && (
                <div>
                  <p>Adjust resolution</p>
                  <p>Night shift toggle</p>
                </div>
              )}
              {selected === "Sound" && (
                <div>
                  <p>Output device: Speakers / Bluetooth</p>
                  <p>Input: Microphone settings</p>
                </div>
              )}
            </div>
          </div>

          
        </div>

    </motion.div>
  </Rnd>  
  );
};

export default SettingsWindow;
