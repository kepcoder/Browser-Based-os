import { motion } from "framer-motion";
import { closeApp, deleteImage, toggleMaximized, toggleMinimize } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";

const FolderWindow = ({ appName }) => {
  const dispatch = useDispatch();
  const { maximized, minimized } = useSelector(
    (state) => state.mainReducer.openApps[appName]
  );
  const { filesystem } = useSelector((state) => state.mainReducer);
  console.log(filesystem);
  
  const defaultRnd = {
    x: 50,
    y: 50,
    width: 700,
    height: 600,
  };

  const handleDeleteImage = (id)=>{
     if(confirm('Do You want to Delete the image')){
      dispatch(deleteImage(id))
     }
     
  }
  const handleCloseApp = () => {
    dispatch(closeApp(appName));
  };

  const handleMaximize = () => {
    dispatch(toggleMaximized(appName));
  };

  const handleMinimize = () => {
    dispatch(toggleMinimize(appName));
  };
  if (minimized) return null;
  return (
    <Rnd
      default={defaultRnd}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      disableDragging={maximized}
      enableResizing={!maximized}
      dragHandleClassName="handle-folder-drag"
      bounds={"#desktop-root"}
      className="z-50 bg-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 60 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full h-full items-center justify-start gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300 overflow-hidden"
      >
        {/* Title Bar */}
        <div className="handle-folder-drag flex items-center justify-start gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300 cursor-pointer">
          <div
            className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            onClick={handleCloseApp}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
            onClick={handleMinimize}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
            onClick={handleMaximize}
          ></div>
          <span className="ml-4 text-gray-600 font-medium cursor-pointer">
            My Folder
          </span>
        </div>

        {/* Body */}
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 border-r border-gray-300 p-4 text-sm text-gray-700">
            <ul className="space-y-2">
              <li className="cursor-pointer">📁 Recents</li>
              <li className="cursor-pointer">📄 Documents</li>
              <li className="cursor-pointer">🖥 Desktop</li>
              <li className="cursor-pointer">📥 Downloads</li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-3 p-2  gap-4 text-center overflow-auto">
           { filesystem.map((file,idx)=>(
            <div key={idx} className="w-full h-full bg-gray-100 p-4 rounded hover:bg-gray-200">
              <img src={file.dataURL} alt="" onClick={() => handleDeleteImage(file.id)} />
              <p>{file.name}</p>
            </div>
            ))}

          </div>
        </div>
      </motion.div>
    </Rnd>
  );
};

export default FolderWindow;
