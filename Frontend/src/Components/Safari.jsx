import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, safariQuery, safariResults, toggleMaximized, toggleMinimize } from "../store/slice";
import { Rnd } from "react-rnd";

const SafariWindow = ({ appName }) => {
  const dispatch = useDispatch();
  const { maximized, minimized } = useSelector(
    (state) => state.mainReducer.openApps[appName]
  );

  const {query, results} = useSelector((state)=> state.mainReducer.openApps[appName])
   const deafultRnd = {
        x: 100,
        y: 100,
        width: 800,
        height: 600,
    }
  const handleCloseApp = () => dispatch(closeApp(appName));
  const handleMaximize = () => dispatch(toggleMaximized(appName));
  const handleMinimize = () => dispatch(toggleMinimize(appName));

  const handleInputChange = (e) => {
   dispatch(safariQuery(e.target.value));
  }; 
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      dispatch(safariResults(query))
    } else {
      dispatch(safariResults("Please enter a valid search term."))
    }
  };

  return (

<Rnd
   default={deafultRnd}
   position={maximized ? { x: 0, y: 0 } : undefined}
   size={maximized ? { width: "100vw", height: "100vh" } : undefined}
   enableResizing={!maximized}
   disableDragging={maximized}
   bounds="#desktop-root"
   dragHandleClassName="Safari-drag-handle"
   className="z-50"
>
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 40 }}
      transition={{ duration: 0.3 }}
      className=" Safari-drag-handle w-full h-full bg-white shadow-xl border border-gray-300 rounded-md overflow-hidden"
    >
        {/* Safari Top Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={handleCloseApp} />
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" onClick={handleMinimize} />
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" onClick={handleMaximize} />
          <span className="ml-4 text-gray-600 font-medium">Safari --- You Can Search What Ever You Want Except po*n</span>
        </div>

        {/* Tabs Bar (Optional) */}
        <div className="flex gap-3 items-center px-4 py-2 border-b bg-white text-sm text-gray-700">
          <div className="px-3 py-1 bg-gray-200 rounded-md mr-2">New Tab</div>
          <div className="text-gray-400 italic">+ Add Tab</div>
          <div className="text-gray-600 italic">For My details Search "iamshubh03" and You Will Get My😎, 45K Foll. instagram, 10K Subs Youtube, Telegram, heylink All</div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 px-4 py-2 border-b bg-gray-50"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e)}
            placeholder="Search or enter website name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go
          </button>
        </form>

        {/* Results */}
        <div className="p-4 text-sm text-gray-800 bg-white h-full overflow-auto">
          {results ? (
            <iframe src={results} frameBorder="0"
            className="w-full h-full border-none"
            title="Search Results"></iframe>
          ) : (
            <div className="text-gray-400 italic mt-4">Search results will appear here...</div>
          )}
        </div>
 
    </motion.div>
</Rnd>
  );
};

export default SafariWindow;
