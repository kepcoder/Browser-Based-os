// ChatBotWindow.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { closeApp, toggleMinimize, toggleMaximized } from "../store/slice";

const featureSteps = [
  "Hi, I'm your AI Guide! 👋",

  `About Notes, 
   Featues -->
   1---> You can make the text bold, italic, or underlined
   2---> Increase Decrease the font side🥳 
   3---> You can change the colour of the text😎 
   4---> Shortcut keys to make bold,italic worked✅`,

  `About Vscode,
   Features --> 
   ---> You can Run your html,js file.`,

  `About Terminal,
   Features
   ---> You can run commands like 
   'help', 'clear', 'date', 'echo', 'whoami', and 'pwd'.`,

  `About Spotify
   Features
   ---> You can play, pause songs.
   ---> You can search for songs and artists.
   ---> Lots of playlist are available for you to enjoy!`,

 `About Safari,
   Features 
   ---> You can search anything you want.
   ---> Own custom Search Display.`,
   `Special Features
   ---> You can open multiple windows and apps.
   ---> You can minimize, maximize, and close windows.
   ---> You can drag and resize windows.
   ---> If You Minimize the App, You can see it in the dock at the bottom.
   --->Create new folder, Change wallpaper, and change brightness level.`,
    "You can drag & Resize The windows ",

  "Enjoy your MacOS clone experience! 🍎"
];

const ChatBotWindow = ({ appName }) => {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(
    (state) => state.mainReducer.openApps[appName]
  );
  const [step, setStep] = useState(0);

  const handleClose = () => dispatch(closeApp(appName));
  const handleMinimize = () => dispatch(toggleMinimize(appName));
  const handleMaximize = () => dispatch(toggleMaximized(appName));

  return (
    <Rnd
      default={{ x: 200, y: 100, width: 400, height: 300 }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      enableResizing={!maximized}
      disableDragging={maximized}
      bounds="#desktop-root"
      dragHandleClassName="ChatBot-drag"
      className="z-50"
    >
      <div className="flex flex-col h-full bg-white border border-gray-300 rounded-md overflow-hidden">
        {/* Title Bar */}
        <div className="ChatBot-drag flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300">
          <div
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            onClick={handleClose}
          ></div>
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
            onClick={handleMinimize}
          ></div>
          <div
            className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
            onClick={handleMaximize}
          ></div>
          <span className="ml-4 text-gray-700 font-medium">AI ChatBot</span>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-4 text-sm overflow-auto">
          <p className="whitespace-pre-line text-xl">{featureSteps[step]}</p>
        </div>

        {/* Next Button */}
        <div className="px-4 py-2 border-t bg-gray-50 text-right">
          <button
            onClick={() => setStep((prev) => Math.min(prev + 1, featureSteps.length - 1))}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
            disabled={step === featureSteps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </Rnd>
  );
};

export default ChatBotWindow;
