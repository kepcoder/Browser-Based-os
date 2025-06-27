import { motion, AnimatePresence } from "framer-motion";
import { hideMenu, showMenu } from "./store/slice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Taskbar from "./Components/Taskbar";
import RightClick from "./Components/RightClick";
import FolderWindow from "./Components/Folder";
import AppStoreWindow from "./Components/AppStoreWindow";
import SettingsWindow from "./Components/Setting";
import NotesWindow from "./Components/Notes";
import SafariWindow from "./Components/Safari";
import FinderWindow from "./Components/Finder";
import Desktop from "./Components/DeskTopIcon";
import SpotifyWindow from "./Components/Spotify";
import TerminalWindow from "./Components/Terminal.jsx";
import VSCodeWindow from "./Components/Vscode";
import ChatBotWindow from "./Components/Chatbot.jsx";
import CameraWindow from "./Components/Camera.jsx";
import BinanceWindow from './Components/Binance';

const App = () => {
  const dispatch = useDispatch();
  const { openApps } = useSelector((state) => state.mainReducer);
  const { url } = useSelector((state) => state.mainReducer.wallpapers);
  const { brightnessLevel } = useSelector((state) => state.mainReducer);


  const handleRightClick = (e) => {
    e.preventDefault();
    const x =
      e.clientX + 160 > window.innerWidth ? window.innerWidth - 160 : e.clientX;
    const y =
      e.clientY + 100 > window.innerHeight
        ? window.innerHeight - 100
        : e.clientY;
    dispatch(showMenu({ x, y }));
  };
  const hideRightClick = (e) => {
    dispatch(hideMenu());
  };

  return (
    <AnimatePresence>
      <motion.div
        key={url}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onContextMenu={handleRightClick}
        onClick={hideRightClick}
        id="desktop-root"
        className="w-screen h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${url})`,
          filter: `brightness(${brightnessLevel}%)`,
        }}
      >
        <Navbar />
        {Object.entries(openApps).map(([name, app]) => {
          if (!app.visible || app.minimized) return null;
          if (name === "Folder")
            return <FolderWindow key={name} appName={name} />;
          if (name === "AppStore")
            return <AppStoreWindow key={name} appName={name} />;
          if (name === "Settings")
            return <SettingsWindow key={name} appName={name} />;
          if (name === "Notes")
            return <NotesWindow key={name} appName={name} />;
          if (name === "Safari")
            return <SafariWindow key={name} appName={name} />;
          if (name === "Finder")
            return <FinderWindow key={name} appName={name} />;
          if (name === "Spotify")
            return <SpotifyWindow key={name} appName={name} />;
          if (name === "Terminal")
            return <TerminalWindow key={name} appName={name} />;
          if (name === "Vscode")
            return <VSCodeWindow key={name} appName={name} />;
          if (name === "Chatbot")
            return <ChatBotWindow key={name} appName={name} />;
          if (name === "Camera")
            return <CameraWindow key={name} appName={name} />;
          if (name === "Binance")
            return <BinanceWindow key={name} appName={name} />;
          return null;
        })}
        <RightClick />
        <Taskbar />
        <Desktop />
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
