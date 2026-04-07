import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Flag, RotateCcw } from 'lucide-react';

const MAZE_SIZE = 8;
const TRAPS = [
  {r: 1, c: 2}, {r: 2, c: 5}, {r: 4, c: 1}, {r: 5, c: 4}, {r: 6, c: 2}, {r: 3, c: 7}
];

export default function MazeGame({ onComplete }) {
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [message, setMessage] = useState("Dùng các phím mũi tên hoặc nút bấm để di chuyển!");
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (isWon) return;
      if (e.key === 'ArrowUp') move(-1, 0);
      if (e.key === 'ArrowDown') move(1, 0);
      if (e.key === 'ArrowLeft') move(0, -1);
      if (e.key === 'ArrowRight') move(0, 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [pos, isWon]);

  const move = (dr, dc) => {
    const nr = Math.max(0, Math.min(MAZE_SIZE - 1, pos.r + dr));
    const nc = Math.max(0, Math.min(MAZE_SIZE - 1, pos.c + dc));
    
    // Check trap
    const hitTrap = TRAPS.find(t => t.r === nr && t.c === nc);
    if (hitTrap) {
      setMessage("Ối! đạp trúng bẫy r! Quay lại vạch xuất phát thôi 😂");
      setPos({ r: 0, c: 0 });
      return;
    }

    setPos({ r: nr, c: nc });
    setMessage("Cố lên, sắp đến đích r!");

    if (nr === MAZE_SIZE - 1 && nc === MAZE_SIZE - 1) {
      setIsWon(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white/40 rounded-3xl border-2 border-mint-200">
      <div className="mb-4 text-center">
        <p className="text-mint-700 font-bold bg-white/80 px-4 py-2 rounded-full shadow-sm">
          {message}
        </p>
      </div>

      <div className="grid grid-cols-8 gap-1 bg-slate-200 p-2 rounded-xl shadow-inner mb-6">
        {[...Array(MAZE_SIZE)].map((_, r) => (
          [...Array(MAZE_SIZE)].map((_, c) => {
            const isStart = r === 0 && c === 0;
            const isEnd = r === MAZE_SIZE - 1 && c === MAZE_SIZE - 1;
            const isPlayer = pos.r === r && pos.c === c;
            const isTrap = TRAPS.find(t => t.r === r && t.c === c);

            return (
              <div 
                key={`${r}-${c}`} 
                className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center transition-all ${
                  isStart ? 'bg-mint-200' : 
                  isEnd ? 'bg-yellow-200 animate-bounce' : 
                  'bg-white'
                }`}
              >
                {isPlayer && (
                  <motion.div layoutId="player" className="w-6 h-6 bg-mint-500 rounded-full shadow-lg border-2 border-white" />
                )}
                {isEnd && !isPlayer && <Flag size={16} className="text-yellow-600" />}
                {isTrap && <Ghost size={12} className="text-slate-100" />}
              </div>
            );
          })
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 md:hidden">
        <div />
        <button onClick={() => move(-1, 0)} className="p-3 bg-mint-400 rounded-xl text-white"><RotateCcw className="rotate-90" /></button>
        <div />
        <button onClick={() => move(0, -1)} className="p-3 bg-mint-400 rounded-xl text-white"><RotateCcw /></button>
        <button onClick={() => move(1, 0)} className="p-3 bg-mint-400 rounded-xl text-white"><RotateCcw className="-rotate-90" /></button>
        <button onClick={() => move(0, 1)} className="p-3 bg-mint-400 rounded-xl text-white"><RotateCcw className="rotate-180" /></button>
      </div>

      {isWon && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-10 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center rounded-3xl">
          <Flag size={64} className="text-mint-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">PHÁ ĐẢO MÊ CUNG!</h2>
          <p className="text-slate-600 mb-6">Mấy cái bẫy kia ko lừa được m r.</p>
          <button onClick={onComplete} className="btn-primary px-12 py-3">TIẾP TỤC</button>
        </motion.div>
      )}
    </div>
  );
}
