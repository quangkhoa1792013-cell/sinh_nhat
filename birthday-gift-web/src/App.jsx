import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('gatekeeper');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [completedGames, setCompletedGames] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Tạo ngôi sao nền
  useEffect(() => {
    if (currentPage === 'hub' || currentPage === 'revelation') {
      const createStars = () => {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'fixed inset-0 pointer-events-none';
        for (let i = 0; i < 50; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.width = Math.random() * 3 + 'px';
          star.style.height = star.style.width;
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 3 + 's';
          starsContainer.appendChild(star);
        }
        document.body.appendChild(starsContainer);
        return () => document.body.removeChild(starsContainer);
      };
      return createStars();
    }
  }, [currentPage]);

  // Tạo pháo hoa
  const createConfetti = () => {
    setShowConfetti(true);
    const colors = ['#98FF98', '#FFB7C5', '#2d8659', '#f0f8f0', '#e6b3cc'];
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => document.body.removeChild(confetti), 3000);
      }, i * 30);
    }
  };

  const handleAuthentication = (key) => {
    if (key === 'SANG-XIN-MIN-2026') {
      setIsAuthenticated(true);
      setTimeout(() => setCurrentPage('hub'), 1000);
      return true;
    }
    return false;
  };

  const handleGameComplete = (gameId) => {
    if (!completedGames.includes(gameId)) {
      const newCompleted = [...completedGames, gameId];
      setCompletedGames(newCompleted);
      
      if (newCompleted.length === 4) {
        setTimeout(() => {
          setCurrentPage('revelation');
          createConfetti();
        }, 1000);
      }
    }
  };

  const GatekeeperPage = () => (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 50%, #d4ffd4 100%)'}}>
      <div className={`bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl transform transition-all duration-1000 border-2 border-green-300 ${
        isAuthenticated ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">� Người Gác Cổng Khác Lớp �</h1>
        <p className="text-green-700 text-center mb-6">Nhập khóa bí mật để bắt đầu hành trình</p>
        <GatekeeperForm onSuccess={handleAuthentication} />
      </div>
    </div>
  );

  const HubPage = () => (
    <div className="min-h-screen p-8" style={{background: 'linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 50%, #d4ffd4 100%)'}}>
      <h1 className="text-5xl font-bold text-green-800 text-center mb-12">� 4 Thử Thách Bạn Bè �</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <GameCard 
          id="catch"
          title="� Săn Tìm Mỹ Phẩm"
          description="Hứng đủ 10 chai sữa tắm và tẩy trang"
          completed={completedGames.includes('catch')}
          onComplete={() => handleGameComplete('catch')}
        />
        <GameCard 
          id="quiz"
          title="🤔 Ai Là 'Thủ Phạm'?"
          description="Trả lời các câu hỏi về người tặng quà"
          completed={completedGames.includes('quiz')}
          onComplete={() => handleGameComplete('quiz')}
        />
        <GameCard 
          id="maze"
          title="� Thoát Khởi Cá Tháng Tư"
          description="Tìm đường đi qua mê cung đầy đùa"
          completed={completedGames.includes('maze')}
          onComplete={() => handleGameComplete('maze')}
        />
        <GameCard 
          id="memory"
          title="📚 Mảnh Ghép Hoàn Hảo"
          description="Lật thẻ tìm cặp trùng khớp"
          completed={completedGames.includes('memory')}
          onComplete={() => handleGameComplete('memory')}
        />
      </div>
      <div className="text-center mt-8">
        <p className="text-green-700 font-semibold">Đã hoàn thành: {completedGames.length}/4 thử thách</p>
      </div>
    </div>
  );

  const RevelationPage = () => (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 50%, #d4ffd4 100%)'}}>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-12 shadow-2xl text-center border-2 border-green-300">
        <h1 className="text-5xl font-bold text-green-800 mb-8">🎉 Hoàn Thành! 🎉</h1>
        <div className="bg-green-100 text-green-900 px-8 py-6 rounded-xl mb-8 border-2 border-green-400">
          <p className="text-2xl font-bold mb-2">Mã Bí Mật:</p>
          <p className="text-4xl font-mono">QUA-MUON-NHUNG-CHAT</p>
        </div>
        <p className="text-green-700 text-lg mb-6">
          Sao chép mã này và quay lại Người Gác Cổng để nhận món quà thật!
        </p>
        <button 
          onClick={() => navigator.clipboard.writeText('QUA-MUON-NHUNG-CHAT')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          📋 Sao Chép Mã
        </button>
      </div>
    </div>
  );

  return (
    <div className="App">
      {currentPage === 'gatekeeper' && <GatekeeperPage />}
      {currentPage === 'hub' && <HubPage />}
      {currentPage === 'revelation' && <RevelationPage />}
    </div>
  );
};

const GatekeeperForm = ({ onSuccess }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSuccess(key)) {
      setError('');
    } else {
      setError('Khóa không đúng! Thử lại nhé 😉');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Nhập khóa bí mật..."
        className={`w-full px-4 py-3 rounded-lg bg-white/80 text-green-800 placeholder-green-600 border-2 border-green-300 focus:border-green-500 focus:outline-none ${
          isShaking ? 'animate-pulse' : ''
        }`}
      />
      {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
      >
        🔓 Mở Khóa
      </button>
    </form>
  );
};

const GameCard = ({ id, title, description, completed, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    // Mô phỏng hoàn thành game sau 3 giây
    setTimeout(() => {
      setIsPlaying(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className={`bg-white/90 backdrop-blur-md rounded-xl p-6 border-2 transition-all shadow-lg ${
      completed ? 'border-green-400 bg-green-50' : 'border-green-300 hover:border-green-400 hover:shadow-xl'
    }`}>
      <h3 className="text-2xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700 mb-4">{description}</p>
      {completed ? (
        <div className="text-green-600 font-bold">✅ Hoàn thành!</div>
      ) : (
        <button
          onClick={startGame}
          disabled={isPlaying}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
        >
          {isPlaying ? '🎮 Đang chơi...' : '▶️ Bắt đầu'}
        </button>
      )}
    </div>
  );
};

export default App;
