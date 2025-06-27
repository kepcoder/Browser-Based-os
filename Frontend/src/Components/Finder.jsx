import { useDispatch, useSelector } from "react-redux";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice";
import { motion } from "framer-motion";
import { Rnd } from "react-rnd";

const FinderWindow = ({ appName }) => {
  const dispatch = useDispatch();
  const { maximized, minimized } = useSelector((state) => state.mainReducer.openApps[appName] );
  const deafultRnd = {
        x: 100,
        y: 100,
        width: 700,
        height: 500,
    }
  const handleCloseApp = () => dispatch(closeApp(appName));
  const handleMaximize = () => dispatch(toggleMaximized(appName));
  const handleMinimize = () => dispatch(toggleMinimize(appName));

  if (minimized) return null;

  return (
    <Rnd
      default={deafultRnd}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      enableResizing={!maximized}
      disableDragging={maximized}
      bounds="#desktop-root"
      dragHandleClassName="finder-drag-handle"
      className="z-50"
    >
      <motion.div
        className="w-full h-full bg-white shadow-xl border border-gray-300 rounded-md overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Bar */}
        <div className="finder-drag-handle flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300 z-50">
          <div
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            onClick={handleCloseApp}
          />
          <div
            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
            onClick={handleMinimize}
          />
          <div
            className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
            onClick={handleMaximize}
          />
          <span className="ml-4 font-medium text-gray-600">Finder</span>
        </div>

        {/* Body */}
        <div className="flex h-[calc(100%-40px)]">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 border-r border-gray-300 p-4 text-sm">
            <p className="text-gray-500 font-medium mb-2">Favourites</p>
            <ul className="space-y-1">
              <li className="cursor-pointer hover:bg-gray-200 rounded px-2 py-1">AirDrop</li>
              <li className="cursor-pointer hover:bg-gray-200 rounded px-2 py-1">Applications</li>
              <li className="cursor-pointer hover:bg-gray-200 rounded px-2 py-1">Desktop</li>
              <li className="cursor-pointer hover:bg-gray-200 rounded px-2 py-1">Documents</li>
              <li className="cursor-pointer hover:bg-gray-200 rounded px-2 py-1">Downloads</li>
            </ul>

            <p className="text-gray-500 font-medium mb-2 mt-6">Locations</p>
            <ul className="space-y-1">
              <li className="cursor-pointer hover:bg-gray-200 rounded px-2 py-1">Macintosh HD</li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white p-4 overflow-auto">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2 p-3 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <img src="/folder-icon.webp" alt="folder" className="w-10 h-10" />
                  <span className="text-xs text-gray-600 text-center">Folder {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Rnd>
  );
};

export default FinderWindow;
