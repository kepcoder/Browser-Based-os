// src/Components/NotesWindow.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { closeApp, toggleMaximized, toggleMinimize } from "../store/slice";

const initialNotes = [
  { id: 1, title: "Meeting Notes", body: "- Discuss Q3 targets\n- Finalize UI for dashboard\n- Assign mobile dev tasks" },
  { id: 2, title: "Grocery List",  body: "- Eggs\n- Milk\n- Bread\n- Apples" },
  { id: 3, title: "Ideas",         body: "- Build a macOS clone\n- Launch AI startup\n- Create design portfolio" },
];

export default function NotesWindow({ appName }) {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector(
    (s) => s.mainReducer.openApps[appName]
  );

  /* local state for notes */
  const [notes, setNotes] = useState(initialNotes);
  const [activeId, setActiveId] = useState(notes[0].id);
  const activeNote = notes.find((n) => n.id === activeId);

  /* handlers */
  const saveBody = (html) => {
    setNotes((ns) =>
      ns.map((n) => (n.id === activeId ? { ...n, body: html } : n))
    );
  };

  const addNote = () => {
    const id = Date.now();
    setNotes([
      ...notes,
      { id, title: "Untitled", body: "" },
    ]);
    setActiveId(id);
  };

  if (minimized) return null;

  return (
    <Rnd
      default={{ x: 120, y: 100, width: 800, height: 600 }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      disableDragging={maximized}
      enableResizing={!maximized}
      bounds="#desktop-root"
      dragHandleClassName="notes-drag"
      className="z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.25 }}
        className="w-full h-full bg-white border border-gray-300 rounded-md overflow-hidden"
      >
        {/* title bar */}
        <div className="notes-drag flex items-center gap-2 px-4 py-2 bg-gray-100 border-b">
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
          <span className="ml-4 font-medium text-gray-600">Notes</span>
        </div>

        {/* body split */}
        <div className="flex h-[calc(100%-40px)]">
          {/* sidebar */}
          <div className="w-1/3 bg-[#FDF6E3] border-r p-4 overflow-y-auto space-y-3">
            {notes.map((n) => (
              <div
                key={n.id}
                className={`p-2 rounded cursor-pointer ${
                  n.id === activeId ? "bg-yellow-200" : "hover:bg-yellow-100"
                }`}
                onClick={() => setActiveId(n.id)}
              >
                <h4 className="text-sm font-semibold truncate">{n.title}</h4>
                <p className="text-xs text-gray-600 truncate">
                  {n.body.replace(/\n/g, " ").slice(0, 40)}
                </p>
              </div>
            ))}
            <button
              onClick={addNote}
              className="w-full mt-4 py-2 bg-yellow-300/90 hover:bg-yellow-300 rounded text-sm font-medium"
            >
              ➕ New Note
            </button>
          </div>

          {/* editor */}
          <div className="flex-1 flex flex-col">
            {/* tiny toolbar */}
            <div className="flex gap-2 px-4 py-2 bg-gray-100 border-b items-center">
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() => document.execCommand("bold")}
              >
                <b>B</b>
              </button>
              <button
                className="px-2 py-1 text-sm italic rounded hover:bg-gray-200"
                onClick={() => document.execCommand("italic")}
              >
                <i>I</i>
              </button>
              <button
                className="px-2 py-1 text-sm underline rounded hover:bg-gray-200"
                onClick={() => document.execCommand("underline")}
              >
                <u>U</u>
              </button>
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() => document.execCommand("fontsize", false, 4)}
              >
                 Font++
              </button>
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() => document.execCommand("fontsize", false, 1)}
              >
                 Font--
              </button>
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() => document.execCommand("fontsize", false, 3)}
              >
                 Normal
              </button>
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() =>{
                  document.execCommand("styleWithCSS", false, true);
                  document.execCommand("foreColor", false, "red")
                }}
              >
                 <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </button>
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() =>{
                  document.execCommand("styleWithCSS", false, true);
                  document.execCommand("foreColor", false, "green")
                }}
              >
                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </button>
              <button
                className="px-2 py-1 text-sm rounded hover:bg-gray-200"
                onClick={() =>{
                  document.execCommand("styleWithCSS", false, true);
                  document.execCommand("foreColor", false, "black")
                }}
              >
                 <div className="w-3 h-3 bg-black rounded-full"></div>
              </button>
            </div>

            {/* editable area */}
            <div
              contentEditable
              className="flex-1 h-full p-4 overflow-auto outline-none"
              suppressContentEditableWarning
              spellCheck="false"
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            />
          </div>
        </div>
      </motion.div>
    </Rnd>
  );
}
