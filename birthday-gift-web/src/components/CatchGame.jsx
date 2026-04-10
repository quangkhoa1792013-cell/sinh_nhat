import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bath, Sparkles, Trophy } from 'lucide-react';

const ITEMS_TYPES = [
  { id: 1, type: 'bath', icon: <Bath className="text-mint-700" /> },
  { id: 2, type: 'sparkles', icon: <Sparkles className="text-softpink-600" /> },
];

export default function CatchGame({ onComplete }) {
  const [basketPos, setBasketPos] = useState(50);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const processedItems = useRef(new Set()); // Để tránh tính điểm 2 lần cho 1 món
  const gameRef = useRef(null);
  const SCORE_GOAL = 20;

  // Di chuyển giỏ hứng
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setBasketPos(prev => Math.max(0, prev - 10));
      if (e.key === 'ArrowRight') setBasketPos(prev => Math.min(90, prev + 10));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Tạo item mới với tốc độ cố định để ổn định
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 90,
        y: -10,
        fallSpeed: 1, // Tốc độ rơi cố định để không bị lúc nhanh lúc chậm
        type: ITEMS_TYPES[Math.floor(Math.random() * ITEMS_TYPES.length)],
      };
      setItems(prev => [...prev, newItem]);
    }, 700);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Vòng lặp game chính
  useEffect(() => {
    if (gameOver) return;
    const gameLoop = setInterval(() => {
      setItems(prev => {
        let scoreBonus = 0;
        const nextItems = prev.map(item => ({ ...item, y: item.y + item.fallSpeed }));
        
        const filteredItems = nextItems.filter(item => {
          // Kiểm tra va chạm
          const isCaught = item.y > 80 && item.y < 92 && Math.abs(item.x - basketPos) < 12;
          
          if (isCaught && !processedItems.current.has(item.id)) {
            processedItems.current.add(item.id);
            scoreBonus += 1; // Luôn luôn là 1 điểm mỗi món
            return false;
          }
          
          return item.y < 110; // Giữ lại các món chưa rơi quá màn hình
        });

        if (scoreBonus > 0) {
          setScore(s => {
            const finalScore = s + scoreBonus;
            if (finalScore >= SCORE_GOAL) setGameOver(true);
            return Math.min(finalScore, SCORE_GOAL);
          });
        }

        return filteredItems;
      });
    }, 40);
    return () => clearInterval(gameLoop);
  }, [basketPos, gameOver]);

  return (
    <div ref={gameRef} className="relative w-full h-[500px] bg-mint-50/20 rounded-[2.5rem] border-4 border-mint-300 overflow-hidden cursor-none shadow-xl"
         onMouseMove={(e) => {
           if (gameRef.current) {
             const rect = gameRef.current.getBoundingClientRect();
             const x = ((e.clientX - rect.left) / rect.width) * 100;
             setBasketPos(Math.min(90, Math.max(0, x - 5)));
           }
         }}>
      
      {/* HUD Điểm */}
      <div className="absolute top-6 left-6 bg-mint-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg z-20 border-b-4 border-mint-800">
        ĐIỂM: {score} / {SCORE_GOAL}
      </div>

      {/* Hiển thị các món đồ đang rơi */}
      <AnimatePresence>
        {items.map(item => (
          <div
            key={item.id}
            className="absolute text-4xl"
            style={{ left: `${item.x}%`, top: `${item.y}%`, transition: 'top 0.04s linear' }}
          >
            {item.type.icon}
          </div>
        ))}
      </AnimatePresence>

      {/* Giỏ hứng - Làm đậm hơn, rõ ràng hơn */}
      <div 
        className="absolute bottom-6 h-16 w-28 bg-mint-700 rounded-b-3xl rounded-t-lg border-t-8 border-mint-900 shadow-2xl flex items-center justify-center transition-all duration-75"
        style={{ left: `${basketPos}%` }}
      >
        <div className="w-20 h-3 bg-mint-400/40 rounded-full"></div>
      </div>

      {/* Màn hình chiến thắng - Fix màu nút bấm */}
      {gameOver && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 bg-mint-600/95 flex flex-col items-center justify-center text-white p-10 text-center z-50"
        >
          <div className="bg-white p-8 rounded-full mb-8 shadow-2xl animate-bounce">
            <Trophy size={75} className="text-yellow-500" />
          </div>
          <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">XUẤT SẮC!</h2>
          <p className="text-xl mb-12 font-bold text-mint-50">Chị đã hứng đủ {SCORE_GOAL} món đồ dưỡng da rồi!</p>
          <button 
            onClick={onComplete} 
            className="bg-black text-mint-800 font-black px-16 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-2xl uppercase"
          >
            TIẾP TỤC
          </button>
        </motion.div>
      )}

      {!gameOver && score === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl border-2 border-mint-300 text-mint-800 font-black text-lg shadow-lg">
            DI CHUYỂN ĐỂ HỨNG ĐỒ NHÉ! 🧴
          </div>
        </div>
      )}
    </div>
  );
}
