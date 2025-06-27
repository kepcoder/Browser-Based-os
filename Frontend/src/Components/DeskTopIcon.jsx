import { useDispatch, useSelector } from "react-redux";
import { showApp, renameItem } from "../store/slice";
import { useState, useRef } from "react";
import { Rnd } from "react-rnd";

const Desktop = () => {
  const dispatch = useDispatch();
  const { desktopIcons } = useSelector((state) => state.mainReducer);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    idx: null,
  });
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);

  // Show context menu on right click
  const handleContextMenu = (e, idx) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, idx });
  };

  // Hide context menu
  const handleCloseMenu = () =>
    setContextMenu({ ...contextMenu, visible: false });

  // Start renaming
  const handleRename = () => {
    if (contextMenu.idx === null || contextMenu.idx === undefined) {
      setContextMenu({ ...contextMenu, visible: false });
      return;
    }
    setEditingIdx(contextMenu.idx);
    setEditValue(desktopIcons[contextMenu.idx].label);
    setContextMenu({ ...contextMenu, visible: false });
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  // Save new name
  const handleRenameSubmit = (idx) => {
    if (editValue.trim() && editValue !== desktopIcons[idx].label) {
      dispatch(renameItem({ id: idx, label: editValue }));
    }
    setEditingIdx(null);
  };

  return (
    <div
      className="absolute top-15 left-0 p-4 z-10"
      onClick={handleCloseMenu}
      onContextMenu={(e) => handleContextMenu(e, null)}
    >
      {desktopIcons.map(({ name, label, icon }, idx) => (
        <Rnd
          key={idx}
          default={{
            x: Math.floor(idx / 6) * 80,
            y: (idx % 6) * 100,
            width: 80,
            height: 100,
          }}
          bounds="#desktop-root"
          disableDragging={editingIdx === idx}
          className="z-50"
        >
          <div
            id={
              name === "Spotify"
                ? "spotify-icon"
                : name === "VSCode"
                ? "vscode-icon"
                : name === "Terminal"
                ? "terminal-icon"
                : undefined
            }
            onDoubleClick={() => dispatch(showApp(name))}
            onContextMenu={(e) => handleContextMenu(e, idx)}
            className="flex flex-col items-center cursor-pointer hover:bg-white/10 rounded-md p-1 w-20 h-24"
            style={{ width: "80px", height: "100px" }}
          >
            <img src={icon} alt={label} className="w-12 h-12" />
            {editingIdx === idx ? (
              <input
                ref={inputRef}
                className="text-xs text-center mt-1 rounded bg-white text-black px-1 py-0.5 outline-none border border-blue-400"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleRenameSubmit(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit(idx);
                  if (e.key === "Escape") setEditingIdx(null);
                }}
                maxLength={30}
              />
            ) : (
              <span className="text-white text-xs text-center mt-1 select-none">
                {label}
              </span>
            )}
          </div>
        </Rnd>
      ))}
      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="fixed bg-white border border-gray-300 rounded shadow-md z-50 text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x, minWidth: 100 }}
        >
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleRename}
          >
            Rename
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
