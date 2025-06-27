import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { closeApp, toggleMinimize, toggleMaximized, savePhoto } from "../store/slice";

export default function CameraWindow({ appName }) {
  /* redux */
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(s => s.mainReducer.openApps[appName]);

  /* refs */
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleMaximized = () => {
    alert("You can not maximize this app");
  }
 const handleShowPhoto = (src,i) => {
    setShowPhoto(src)
  }
  /* thumbnails */
  const [shots, setShots] = useState([]); 
  const [showPhoto, setShowPhoto] = useState(null); 

  /* start camera */
  useEffect(() => {
    let stream;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(s => {
        stream = s;
        videoRef.current.srcObject = s;
      })
      .catch(() => alert("Camera permission denied"));
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const takeShot = () => {
    const vid = videoRef.current;
    const cvs = canvasRef.current;
    if (!vid || !cvs) return;
    cvs.width = vid.videoWidth;
    cvs.height = vid.videoHeight;
    cvs.getContext("2d").drawImage(vid, 0, 0);
    const dataURL = cvs.toDataURL("image/png");
    setShots(prev => [dataURL, ...prev.slice(0, 4)]);
    dispatch(savePhoto({ name: `photo-${Date.now()}.png`, dataURL }));
  };

  if (minimized) return null;

  return (
    <Rnd
      default={{ x: 220, y: 100, width: 500, height: 500 }}
      enableResizing={!maximized}
      disableDragging={maximized}
      bounds="#desktop-root"
      dragHandleClassName="cam-drag-bar"
      className="z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.25 }}
        className="w-full h-full flex flex-col bg-black rounded-md border border-gray-700"
      >
        {/* title bar */}
        <div className="cam-drag-bar flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700 select-none">
          <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={() => dispatch(closeApp(appName))} />
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer" onClick={() => dispatch(toggleMinimize(appName))} />
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer" onClick={() => handleMaximized()} />
          <span className="ml-4 text-sm text-white">Camera</span>
        </div>

        {/* video feed */}
        <div className="flex-1 relative bg-black  overflow-auto">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          {/* shutter button */}
          <button
            onClick={takeShot}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white active:scale-95 transition"
          ></button>
        </div>

        {/* thumbnail strip */}
        {shots.length > 0 && (
          <div className="flex gap-2 p-2 bg-gray-900 border-t border-gray-800 overflow-x-auto">
            {shots.map((src, i) => (
              <img key={i} src={src} alt="thumb" className="h-16 w-auto rounded" />
            ))}
          </div>
        )}

        {/* hidden canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </Rnd>

    
  );
}
