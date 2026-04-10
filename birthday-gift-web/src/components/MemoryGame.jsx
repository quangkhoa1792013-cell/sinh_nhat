import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Pen, Heart, Camera, Coffee, Gift, Trophy, Star } from 'lucide-react';

const ICONS = [
  { icon: <Book />, id: 1 },
  { icon: <Pen />, id: 2 },
  { icon: <Heart />, id: 3 },
  { icon: <Camera />, id: 4 },
  { icon: <Coffee />, id: 5 },
  { icon: <Gift />, id: 6 },
  { icon: <Star />, id: 7 },
  { icon: <Star className="text-yellow-500" />, id: 8 },
  { icon: <Heart className="text-red-500" />, id: 9 },
];

export default function MemoryGame({ onComplete }) {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLevelCleared, setIsLevelCleared] = useState(false);

  const GRID_CONFIG = {
    1: { cols: 2, pairs: 2 },  // 2x2
    2: { cols: 4, pairs: 4 },  // 4x2
    3: { cols: 4, pairs: 8 }   // 4x4
  };

  const currentConfig = GRID_CONFIG[level];

  // Khởi tạo bài mỗi khi đổi Level
  useEffect(() => {
    startLevel();
  }, [level]);

  const startLevel = () => {
    setIsLevelCleared(false);
    setFlipped([]);
    setSolved([]);
    
    // Xáo trộn icon ngẫu nhiên từ danh sách gốc
    const availableIcons = [...ICONS].sort(() => Math.random() - 0.5);
    const selectedIcons = availableIcons.slice(0, currentConfig.pairs);
    
    const shuffled = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, uniqueId: index }));
    
    setCards(shuffled);
  };

  const handleClick = (uniqueId) => {
    if (disabled || flipped.includes(uniqueId) || solved.includes(uniqueId)) return;

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      if (cards[first].id === cards[second].id) {
        setSolved(prev => [...prev, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  };

  // Kiểm tra thắng màn
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setIsLevelCleared(true);
      if (level < 3) {
        setTimeout(() => {
          setLevel(prev => prev + 1);
        }, 1500);
      }
    }
  }, [solved, cards]);

  return (
    <div className="relative p-8 bg-white/70 backdrop-blur-md rounded-[2.5rem] border-4 border-mint-200 shadow-2xl min-h-[500px] flex flex-col items-center">
      <div className="text-center mb-8">
        <div className="inline-block bg-mint-100 text-mint-700 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-2 border border-mint-200">
          MÀN {level} / 3
        </div>
        <h2 className="text-3xl font-black text-slate-800">MẢNH GHÉP KỶ NIỆM</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={level}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`grid gap-4 ${
            level === 1 ? 'grid-cols-2' : 'grid-cols-4'
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={card.uniqueId}
              onClick={() => handleClick(index)}
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer perspective-1000"
            >
              <motion.div
                animate={{ rotateY: flipped.includes(index) || solved.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                className="relative w-full h-full preserve-3d"
              >
                {/* Mặt sau */}
                <div className="absolute inset-0 bg-gradient-to-br from-mint-400 to-mint-500 rounded-2xl flex items-center justify-center text-white backface-hidden shadow-lg border-2 border-mint-300 font-black text-2xl">
                  ?
                </div>
                {/* Mặt trước */}
                <div className="absolute inset-0 bg-white border-4 border-mint-400 rounded-2xl flex items-center justify-center text-mint-600 backface-hidden rotate-y-180 shadow-inner text-3xl">
                  {card.icon}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isLevelCleared && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-mint-500/95 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center rounded-[2rem]"
          >
            <Trophy size={80} className="mb-6 text-yellow-300" />
            <h2 className="text-4xl font-black mb-4">TUYỆT VỜI!</h2>
            {level < 3 ? (
              <p className="text-xl font-medium">Chuẩn bị sang màn tiếp theo nhé...</p>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-xl mb-8 font-medium">Chị đã tìm thấy tất cả mảnh ghép rồi!</p>
                <button 
                  onClick={onComplete} 
                  className="bg-black text-mint-700 font-black px-10 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-lg"
                >
                  QUAY LẠI TRANG CHỦ
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
