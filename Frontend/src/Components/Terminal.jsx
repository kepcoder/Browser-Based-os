import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice";

const initialNotes = [
  { id: 1, title: "Meeting Notes", body: "- Discuss Q3 targets\n- Finalize UI for dashboard\n- Assign mobile dev tasks" },
  { id: 2, title: "Grocery List",  body: "- Eggs\n- Milk\n- Bread\n- Apples" },
  { id: 3, title: "Ideas",         body: "- Build a macOS clone\n- Launch AI startup\n- Create design portfolio" },
];

export default function TerminalWindow({ appName }) {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(s => s.mainReducer.openApps[appName]);

  /** ----------------- tiny terminal state --------------- */
  const [lines, setLines] = useState(["Welcome to MacOS Terminal!", "Type 'help' for commands."]);
  const [input, setInput] = useState("");
  const endRef               = useRef(null);

  const run = (cmd) => {
    const args = cmd.trim().split(" ");
    const base = args[0];
    const out  = [];
    switch (base) {
      case "help":
        out.push("help  clear  date  echo  whoami  pwd");
        break;
      case "clear":
        setLines([]);
        return;
      case "date":
        out.push(new Date().toString());
        break;
      case "whoami":
        out.push("iamshubh03");
        break;
      case "pwd":
        out.push("/Users/iamshubh03");
        break;
      case "echo":
        out.push(args.slice(1).join(" "));
        break;
      default:
        out.push(`command not found: ${base}`);
    }
    setLines((prev) => [...prev, `> ${cmd}`, ...out]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  if (minimized) return null;

  return (
    <Rnd
      default={{ x: 120, y: 100, width: 760, height: 460 }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      bounds="#desktop-root"
      enableResizing={!maximized}
      disableDragging={maximized}
      dragHandleClassName="terminal-drag-bar"
      className="z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.25 }}
        className="w-full h-full bg-black text-green-500 font-mono rounded-md overflow-hidden border border-gray-600"
      >
        {/* ───────────── top/title bar (drag handle) ─────────── */}
        <div className="terminal-drag-bar flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700 select-none">
          <div onClick={() => dispatch(closeApp(appName))}        className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></div>
          <div onClick={() => dispatch(toggleMinimize(appName))}  className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
          <div onClick={() => dispatch(toggleMaximized(appName))} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
          <span className="ml-4 text-sm text-white">Terminal</span>
        </div>

        {/* ───────────── terminal area ───────────── */}
        <div className="flex flex-col h-[calc(100%-40px)] p-4 overflow-auto">
          {lines.map((l, i) => (
            <pre key={i} className="whitespace-pre-wrap">{l}</pre>
          ))}

          <div className="flex items-start gap-2 text-green-400">
            <span>$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="bg-transparent outline-none flex-1 min-w-0"
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>
      </motion.div>
    </Rnd>
  );
}
