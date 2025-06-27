import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice";


const starterFiles = [
  {
    id: 1,
    name: "index.html",
    type: "html",
    content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>`
  },
  {
    id: 2,
    name: "styles.css",
    type: "css",
    content: `body {\n  background: #fefefe;\n  font-family: sans-serif;\n}`
  },
  {
    id: 3,
    name: "app.js",
    type: "js",
    content: `console.log('Hello from JS');`
  }
];

export default function VSCodeWindow({ appName }) {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(
    (s) => s.mainReducer.openApps[appName]
  );

  const [files, setFiles] = useState(starterFiles);
  const [activeId, setActiveId] = useState(files[0].id);
  const activeFile = files.find((f) => f.id === activeId);
  const [logs, setLogs] = useState([]);
  const editorRef = useRef(null);

  // auto‑focus on open
  useEffect(() => {
    editorRef.current?.focus();
  }, [activeId]);

  const updateContent = (txt) => {
    setFiles((fs) => fs.map((f) => (f.id === activeId ? { ...f, content: txt } : f)));
  };

  const runCode = () => {
    if (activeFile.type === "html") {
      const blob = new Blob([activeFile.content], { type: "text/html" });
      window.open(URL.createObjectURL(blob), "_blank");
    } else if (activeFile.type === "js") {
      try {
        const tmpLog = [];
        const originalLog = console.log;
        console.log = (...args) => {
            tmpLog.push(args.join(" "));
            originalLog(...args);
        };
        eval(activeFile.content);
        setLogs(tmpLog);
        console.log = originalLog; 
      } catch (e) {
        setLogs([`Error: ${e.message}`]);
      }
    } else {
      alert("Run only works for HTML or JS file");
    }
  };

  if (minimized) return null;

  return (
    <Rnd
      default={{ x: 150, y: 120, width: 960, height: 600 }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      enableResizing={!maximized}
      disableDragging={maximized}
      bounds="#desktop-root"
      dragHandleClassName="vsc-drag-bar"
      className="z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.25 }}
        className="w-full h-full bg-[#1e1e1e] text-gray-200 rounded-md overflow-hidden border border-gray-700"
      >
        {/* top bar */}
        <div className="vsc-drag-bar flex items-center gap-2 px-4 py-2 bg-[#3c3c3c] border-b border-[#00000033] select-none">
          <div
            className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
            onClick={() => dispatch(closeApp(appName))}
          />
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
            onClick={() => dispatch(toggleMinimize(appName))}
          />
          <div
            className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
            onClick={() => dispatch(toggleMaximized(appName))}
          />
          <span className="ml-4 text-sm">VS Code</span>
        </div>

        {/* body split */}
        <div className="flex h-[calc(100%-40px)]">
          {/* sidebar */}
          <div className="w-56 bg-[#252526] border-r border-[#00000066] p-2 text-sm">
            {files.map((f) => (
              <div
                key={f.id}
                className={`px-2 py-1 cursor-pointer rounded flex items-center gap-2 hover:bg-[#37373d] ${
                            "text-gray-100"}
                  ${f.id === activeId ? "bg-[#094771]" : ""}`}
                onClick={() => setActiveId(f.id)}
              >
                <span className="w-3 text-center">
                  {f.type === "html" && "📄"}
                  {f.type === "css" && "🎨"}
                  {f.type === "js" && "📜"}
                </span>
                {f.name}
              </div>
            ))}
          </div>

          {/* editor panel */}
          <div className="flex-1 flex flex-col">
            {/* tab bar */}
            <div className="flex items-center bg-[#2d2d2d] h-8 border-b border-[#00000033] text-xs">
              <div className="px-4 h-full flex items-center bg-[#1e1e1e] border-r border-[#00000033]">
                {activeFile.name}
              </div>
              <button
                onClick={runCode}
                className="ml-auto mr-2 px-3 py-1 bg-green-600 text-xs rounded hover:bg-green-700"
              >
                ▶︎ Run
              </button>
            </div>

            {/* code area */}
            <textarea
              ref={editorRef}
              value={activeFile.content}
              onChange={(e) => updateContent(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-[#1e1e1e] text-sm font-mono p-4 outline-none resize-none text-gray-100 leading-5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
            />
          <div className="h-32 bg-black text-green-400 p-2 overflow-auto text-xs">
             <h3>Vs Code Terminal</h3>
               {logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          </div>

        </div>
      </motion.div>
    </Rnd>
  );
}
