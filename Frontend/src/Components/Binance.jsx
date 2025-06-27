import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { closeApp, toggleMinimize, toggleMaximized } from "../store/slice";

const pairs = [
  { symbol: "BTCUSDT", label: "BTC / USDT" },
  { symbol: "ETHUSDT", label: "ETH / USDT" },
  { symbol: "XRPUSDT", label: "XRP / USDT" },
];

export default function BinanceWindow({ appName }) {
  const dispatch = useDispatch();
  const { minimized, maximized } = useSelector((s) => s.mainReducer.openApps[appName]);

  const [active, setActive] = useState("BTCUSDT");
  const [balance, setBalance] = useState(1000.0);


  if (minimized) return null;

  return (
    <Rnd
      default={{ x: 260, y: 80, width: 900, height: 600 }}
      position={maximized ? { x: 0, y: 0 } : undefined}
      size={maximized ? { width: "100vw", height: "100vh" } : undefined}
      bounds="#desktop-root"
      enableResizing={!maximized}
      disableDragging={maximized}
      dragHandleClassName="bin-drag-bar"
      className="z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col w-full h-full bg-[#0d111c] text-gray-200 rounded-md overflow-hidden border border-[#1e2329]"
      >
        {/*Title Bar*/}
        <div className="bin-drag-bar flex items-center gap-2 px-4 py-2 bg-[#181a20] border-b border-black select-none">
          <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={() => dispatch(closeApp(appName))} />
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer" onClick={() => dispatch(toggleMinimize(appName))} />
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer" onClick={() => dispatch(toggleMaximized(appName))} />
          <span className="ml-4 text-sm">Binance</span>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar: market pairs */}
          <aside className="w-64 bg-[#1e2329] border-r border-[#00000066] overflow-y-auto text-sm">
            {pairs.map((p) => (
              <div
                key={p.symbol}
                className={`px-4 py-2 hover:bg-[#2b3139] cursor-pointer ${p.symbol === active ? "bg-[#2b3139]" : ""}`}
                onClick={() => setActive(p.symbol)}
              >
                {p.label}
              </div>
            ))}
            
             <div className="top-4 right-4 w-full bg-[#181a20] border border-[#353b48] rounded-md p-3 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src="/Binance_macos.webp" alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-gray-100 font-medium leading-none">Shubham</p>
                <p className="text-[10px] text-gray-400 mt-0.5">UID&nbsp;00001</p>
              </div>
            </div>
            <div className="mt-1 text-gray-300">
              Balance:
              <span className="ml-1 font-semibold text-yellow-400">${balance.toFixed(2)} USDT</span>
            </div>
             </div>

          </aside>

          {/* Main Panel */}
          <div className="flex-1 flex flex-col">
            {/* 📈 TradingView Chart */}
            <iframe
              key={active}
              src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE%3A${active}&interval=30&hidesidetoolbar=1&theme=dark&style=1&hideideas=1`}
              title="chart"
              frameBorder="0"
              className="flex-1"
            />
            {/* Orderbook placeholder */}
            <div className="h-28 bg-[#0d111c] border-t border-[#00000066] flex items-center justify-center text-xs text-gray-400">
              Order book & recent trades (dummy)
            </div>
          </div>

        </div>
      </motion.div>
    </Rnd>
  );
}
