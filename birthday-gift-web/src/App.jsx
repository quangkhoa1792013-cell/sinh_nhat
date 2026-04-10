import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Components
import Gatekeeper from './components/Gatekeeper';
import CatchGame from './components/CatchGame';
import QuizGame from './components/QuizGame';
import MazeGame from './components/MazeGame';
import MemoryGame from './components/MemoryGame';

const GAMES = [
  { id: 'catch', title: "🧴 Săn Mỹ Phẩm", description: "Hứng 20 món quà rơi từ trên trời!", component: CatchGame },
  { id: 'quiz', title: "🤔 Ai Thủ Phạm?", description: "3 câu hỏi về người tặng quà.", component: QuizGame },
  { id: 'maze', title: "🎭 Mê Cung Bí Mật", description: "Vượt qua các bẫy để về đích.", component: MazeGame },
  { id: 'memory', title: "📚 Mảnh Ghép", description: "Lật thẻ tìm cặp hình giống nhau.", component: MemoryGame },
];

export default function App() {
  const [page, setPage] = useState('gatekeeper');
  const [completedGames, setCompletedGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    const container = document.querySelector('.stars-container');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      container.appendChild(star);
    }
  }, [page]);

  const handleUnlock = () => setPage('hub');

  const handleGameComplete = (gameId) => {
    if (!completedGames.includes(gameId)) {
      setCompletedGames([...completedGames, gameId]);
      setActiveGame(null);
    }
  };

  const triggerRevelation = () => {
    setPage('revelation');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A7FFEB', '#F8BBD0', '#2d8659']
    });
  };

  const Hub = () => (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-mint-700 text-center mb-10 drop-shadow-sm">
        🎮 4 Thử Thách Cho Chị Iu 🎮
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {GAMES.map((game) => (
          <motion.div 
            key={game.id}
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-3xl border-2 transition-all shadow-lg relative overflow-hidden ${
              completedGames.includes(game.id) 
                ? 'bg-mint-50/80 border-mint-400 opacity-90' 
                : 'bg-white/90 border-white shadow-xl backdrop-blur-sm hover:border-mint-300'
            }`}
          >
            <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm font-medium">{game.description}</p>
            
            {completedGames.includes(game.id) ? (
              <div className="flex items-center text-mint-600 font-bold gap-2 italic">
                <div className="bg-mint-500 text-white p-1 rounded-full">
                  <svg size={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div> 
                Đã vượt qua
              </div>
            ) : (
              <button 
                onClick={() => setActiveGame(game.id)}
                className="btn-primary w-full py-2.5 text-base font-bold"
              >
                Bắt đầu chơi
              </button>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center space-y-6">
        <div className="inline-block bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full border border-mint-200 text-mint-700 font-bold text-sm shadow-sm">
          Tiến độ: {completedGames.length} / {GAMES.length} màn chơi
        </div>

        {completedGames.length === GAMES.length && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <motion.button 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={triggerRevelation}
              className="btn-secondary px-10 py-4 text-xl font-bold shadow-xl rounded-2xl"
            >
              🎁 Lấy Mã Bí Mật 🎁
            </motion.button>
            <p className="mt-3 text-softpink-500 text-sm font-bold animate-pulse">Nhấn để nhận mã nhé!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const Revelation = () => (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md mx-auto p-10 bg-white/95 backdrop-blur-2xl rounded-[2rem] border-2 border-mint-100 text-center shadow-2xl"
    >
      <h1 className="text-5xl mb-6">🎊</h1>
      <h2 className="text-3xl font-bold text-mint-800 mb-8">Chúc mừng chị iu!</h2>
      
      <div className="bg-mint-50 p-6 rounded-2xl mb-8 border border-mint-100">
        <p className="text-xs font-bold text-mint-500 mb-2 uppercase tracking-widest">Mã bí mật của chị</p>
        <p className="text-2xl md:text-3xl font-mono text-slate-800 font-bold select-all">
          CHI-NHI-MAI-DINH-MAI-DINH
        </p>
      </div>

      <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">
        Lưu lại mã này và quay lại ứng dụng <b>Người Gác Cổng</b> để nhận món quà từ em nhé! ❤️
      </p>

      <button 
        onClick={() => {
          navigator.clipboard.writeText('CHI-NHI-MAI-DINH-MAI-DINH');
          alert('Đã copy mã bí mật!');
        }}
        className="btn-secondary w-full py-3.5 text-lg font-bold rounded-xl"
      >
        📋 Sao Chép Mã
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-900 relative" style={{ background: 'linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 50%, #d4ffd4 100%)' }}>
      <div className="stars-container"></div>
      
      <main className="container mx-auto px-4 py-12 relative z-10 flex flex-col justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {page === 'gatekeeper' && (
            <motion.div key="gate" exit={{ opacity: 0, y: -20 }}>
              <Gatekeeper onUnlock={handleUnlock} />
            </motion.div>
          )}
          
          {page === 'hub' && !activeGame && <Hub key="hub" />}
          
          {activeGame && (
            <motion.div 
              key="active-game"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-2xl mx-auto w-full"
            >
              <button 
                onClick={() => setActiveGame(null)}
                className="mb-6 text-mint-800 hover:text-mint-900 flex items-center gap-2 font-bold bg-white/60 px-4 py-2 rounded-full transition-all border border-mint-200 text-sm shadow-sm"
              >
                ← Quay lại danh sách
              </button>
              {(() => {
                const GameComp = GAMES.find(g => g.id === activeGame).component;
                return <GameComp onComplete={() => handleGameComplete(activeGame)} />;
              })()}
            </motion.div>
          )}
          
          {page === 'revelation' && <Revelation key="rev" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
