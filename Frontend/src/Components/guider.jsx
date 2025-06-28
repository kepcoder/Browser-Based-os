import React, { useState, useEffect } from "react";

const features = [
  "🖱️ Drag and move windows just like real MacOS.",
  "🗂️ Open folders and view your files.",
  "🖼️ Camera Featurs is avaibale, Click photo and it will save in folder",
  "📝 Use Notes with bold,italic,underline,size,color, and other apps from the dock.",
  "🖥️ Right-click on desktop for context menu | change wallpaper | Create Folder | Rename Folder",
  "🔍 Try resizing, minimizing, maximizing any window.",
  "--> You can see Your Minimize App on dock Items",
  "--> when you Open App from desktop it will add in dock item",
  "-->Spotify with playlist, Real Browser, Binance, Brightness Control",
  "--> feels Like Real MacOs",
  "-->Many More Feature await You  ",
];

const Guider = ({ onStart }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [typedFeatures, setTypedFeatures] = useState([]);
  const [allTyped, setAllTyped] = useState(false);

  useEffect(() => {
    let currentFeature = 0;
    let currentChar = 0;
    let tempFeatures = [];
    let typing = true;

    function typeNextChar() {
      if (!typing) return;
      if (currentFeature >= features.length) {
        setAllTyped(true);
        return;
      }
      const feature = features[currentFeature];
      if (currentChar === 0) tempFeatures.push("");
      tempFeatures[currentFeature] =
        (tempFeatures[currentFeature] || "") + feature[currentChar];
      setTypedFeatures([...tempFeatures]);
      currentChar++;
      if (currentChar < feature.length) {
        setTimeout(typeNextChar, 25);
      } else {
        currentFeature++;
        currentChar = 0;
        setTimeout(typeNextChar, 50);
      }
    }
    setTypedFeatures([]);
    setAllTyped(false);
    typing = true;
    typeNextChar();
    return () => {
      typing = false;
    };
  }, []);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      onStart(name);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to MacOS Clone!</h1>
      <h2 className="text-2xl font-semibold mb-4">Features</h2>
      <ul className="mb-8 text-lg text-left max-w-xl min-h-[300px]">
        {features.map((feature, idx) => (
          <li key={idx}>{typedFeatures[idx] || ""}</li>
        ))}
      </ul>
      <div className="relative mb-4 w-64">
        <label>Enter Your Name "Madatory"</label>
        <input
          className="w-full px-4 py-2 text-white rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none pr-10 shadow-sm transition-all duration-150"
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!allTyped}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
            />
          </svg>
        </span>
      </div>
      <button
        className={`px-8 py-2 bg-blue-500 hover:bg-blue-600 rounded text-lg font-semibold transition-all duration-150 ${
          loading || !allTyped ? "opacity-60 cursor-not-allowed" : ""
        }`}
        onClick={handleStart}
        disabled={!name || loading || !allTyped}
      >
        {loading ? "Starting..." : "Start"}
      </button>
    </div>
  );
};

export default Guider;
