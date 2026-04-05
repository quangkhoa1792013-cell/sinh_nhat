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
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">� Người Gác Cổng �</h1>
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
    // Mở game thực tế
    if (id === 'catch') {
      openCatchGame(onComplete);
    } else if (id === 'quiz') {
      openQuizGame(onComplete);
    } else if (id === 'maze') {
      openMazeGame(onComplete);
    } else if (id === 'memory') {
      openMemoryGame(onComplete);
    }
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

const openCatchGame = (onComplete) => {
  const gameWindow = window.open('', '_blank', 'width=600,height=600');
  gameWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Săn Tìm Mỹ Phẩm</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { background: linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 100%); margin: 0; overflow: hidden; }
        .item { position: absolute; font-size: 30px; cursor: pointer; transition: transform 0.3s; }
        .item:hover { transform: scale(1.2); }
        .basket { position: absolute; bottom: 20px; width: 80px; height: 60px; background: #8B4513; border-radius: 10px; }
        .score { position: absolute; top: 20px; right: 20px; font-size: 24px; font-weight: bold; color: #2d8659; }
      </style>
    </head>
    <body>
      <div class="score">Độ: <span id="score">0</span>/10</div>
      <div class="basket" id="basket"></div>
      <div id="gameArea"></div>
      <script>
        let score = 0;
        let basketX = 250;
        const gameArea = document.getElementById('gameArea');
        const basket = document.getElementById('basket');
        const scoreEl = document.getElementById('score');
        
        basket.style.left = basketX + 'px';
        
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft' && basketX > 0) basketX -= 20;
          if (e.key === 'ArrowRight' && basketX < 520) basketX += 20;
          basket.style.left = basketX + 'px';
        });
        
        function createItem() {
          const item = document.createElement('div');
          item.className = 'item';
          item.innerHTML = Math.random() > 0.5 ? '🧴' : '🧼';
          item.style.left = Math.random() * 550 + 'px';
          item.style.top = '0px';
          gameArea.appendChild(item);
          
          let y = 0;
          const interval = setInterval(() => {
            y += 3;
            item.style.top = y + 'px';
            
            if (y > 480 && y < 540) {
              const itemX = parseInt(item.style.left);
              if (itemX > basketX - 40 && itemX < basketX + 40) {
                score++;
                scoreEl.textContent = score;
                item.remove();
                clearInterval(interval);
                
                if (score >= 10) {
                  setTimeout(() => {
                    alert('🎉 Hoàn thành! Bạn đã hứng đủ 10 món!');
                    window.close();
                    window.opener.gameCompleted('catch');
                  }, 500);
                }
              }
            }
            
            if (y > 600) {
              item.remove();
              clearInterval(interval);
            }
          }, 30);
        }
        
        setInterval(createItem, 1500);
      </script>
    </body>
    </html>
  `);
};

const openQuizGame = (onComplete) => {
  const gameWindow = window.open('', '_blank', 'width=500,height=600');
  gameWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Ai Là 'Thủ Phạm'?</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { background: linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 100%); padding: 20px; }
        .question { font-size: 18px; margin: 20px 0; color: #2d8659; }
        .option { padding: 15px; margin: 10px 0; background: white; border: 2px solid #98FF98; border-radius: 10px; cursor: pointer; transition: all 0.3s; }
        .option:hover { background: #98FF98; transform: scale(1.05); }
        .correct { background: #90EE90; border-color: #2d8659; }
        .wrong { background: #FFB7C5; border-color: #ff6b6b; }
      </style>
    </head>
    <body>
      <div class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-green-800 mb-8">🤔 Ai Là 'Thủ Phạm'?</h1>
        <div id="quizContainer"></div>
      </div>
      <script>
        const questions = [
          {
            question: "Thằng tặng quà này học lớp nào?",
            options: ["Lớp 10A1", "Lớp 11A2", "Lớp 12A3", "Lớp 9A5"],
            correct: 1
          },
          {
            question: "Nó hay ngồi ở đâu trong căn tin?",
            options: ["Góc cửa sổ", "Bàn giữa", "Góc quầy nước", "Bàn cuối"],
            correct: 2
          },
          {
            question: "Món ăn nó thích nhất là gì?",
            options: ["Cơm gà", "Phở bò", "Bún chả", "Mì tôm"],
            correct: 0
          },
          {
            question: "Nó thường đi học bằng gì?",
            options: ["Xe bus", "Xe đạp", "Đi bộ", "Xe máy"],
            correct: 2
          }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        function showQuestion() {
          const q = questions[currentQuestion];
          const container = document.getElementById('quizContainer');
          container.innerHTML = \`
            <div class="question">Câu \${currentQuestion + 1}: \${q.question}</div>
            \${q.options.map((opt, i) => 
              \`<div class="option" onclick="checkAnswer(\${i})">\${opt}</div>\`
            ).join('')}
          \`;
        }
        
        function checkAnswer(index) {
          const q = questions[currentQuestion];
          const options = document.querySelectorAll('.option');
          
          if (index === q.correct) {
            options[index].classList.add('correct');
            score++;
          } else {
            options[index].classList.add('wrong');
            options[q.correct].classList.add('correct');
          }
          
          setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
              showQuestion();
            } else {
              alert(\`🎉 Hoàn thành! Bạn trả lời đúng \${score}/\${questions.length} câu!\`);
              window.close();
              window.opener.gameCompleted('quiz');
            }
          }, 2000);
        }
        
        showQuestion();
      </script>
    </body>
    </html>
  `);
};

const openMazeGame = (onComplete) => {
  const gameWindow = window.open('', '_blank', 'width=600,height=600');
  gameWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Thoát Khởi Cá Tháng Tư</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { background: linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 100%); padding: 20px; }
        .maze { display: grid; grid-template-columns: repeat(10, 40px); gap: 1px; background: #2d8659; padding: 1px; }
        .cell { width: 40px; height: 40px; background: white; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; }
        .wall { background: #2d8659; cursor: not-allowed; }
        .path { background: #98FF98; }
        .trap { background: #FFB7C5; }
        .end { background: #FFD700; }
        .player { background: #4169E1; }
        .message { text-align: center; font-size: 18px; color: #2d8659; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="message">🎭 Thoát Khởi Cá Tháng Tư - Đi đến ô vàng!</div>
      <div id="maze" class="maze"></div>
      <script>
        const maze = [
          [1,1,1,1,1,1,1,1,1,1],
          [1,0,0,0,1,0,0,0,0,1],
          [1,0,1,0,1,0,1,1,0,1],
          [1,0,1,0,0,0,0,1,0,1],
          [1,0,1,1,1,1,0,1,0,1],
          [1,0,0,0,0,0,0,0,0,1],
          [1,1,1,0,1,1,1,1,0,1],
          [1,0,0,0,0,0,0,1,0,1],
          [1,0,1,1,1,1,0,0,0,1],
          [1,1,1,1,1,1,1,1,2,1]
        ];
        
        let playerPos = {x: 1, y: 1};
        const mazeEl = document.getElementById('maze');
        
        function renderMaze() {
          mazeEl.innerHTML = '';
          for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
              const cell = document.createElement('div');
              cell.className = 'cell';
              
              if (maze[y][x] === 1) cell.classList.add('wall');
              else if (maze[y][x] === 2) cell.classList.add('end');
              else if (Math.random() > 0.8 && maze[y][x] === 0) cell.classList.add('trap');
              else cell.classList.add('path');
              
              if (x === playerPos.x && y === playerPos.y) {
                cell.classList.add('player');
                cell.textContent = '🤖';
              }
              
              if (cell.classList.contains('trap')) cell.textContent = '💀';
              if (cell.classList.contains('end')) cell.textContent = '🏁';
              
              cell.onclick = () => movePlayer(x, y);
              mazeEl.appendChild(cell);
            }
          }
        }
        
        function movePlayer(x, y) {
          if (maze[y][x] === 1) {
            alert('Tường rồi! Không đi được đâu!');
            return;
          }
          
          if (Math.random() > 0.7 && maze[y][x] === 0) {
            const messages = ['Hết quà rồi!', 'Lừa đấy!', 'Sai đường rồi!'];
            alert(messages[Math.floor(Math.random() * messages.length)]);
            return;
          }
          
          playerPos = {x, y};
          
          if (maze[y][x] === 2) {
            alert('🎉 Hoàn thành! Đùa thôi, quà thật ở cuối hành trình này nè!');
            window.close();
            window.opener.gameCompleted('maze');
          }
          
          renderMaze();
        }
        
        renderMaze();
      </script>
    </body>
    </html>
  `);
};

const openMemoryGame = (onComplete) => {
  const gameWindow = window.open('', '_blank', 'width=600,height=600');
  gameWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mảnh Ghép Hoàn Hảo</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { background: linear-gradient(135deg, #f0f8f0 0%, #e6ffe6 100%); padding: 20px; }
        .game-board { display: grid; grid-template-columns: repeat(4, 100px); gap: 10px; justify-content: center; margin: 20px 0; }
        .card { width: 100px; height: 100px; background: #2d8659; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 40px; cursor: pointer; transition: transform 0.3s; }
        .card:hover { transform: scale(1.05); }
        .card.flipped { background: #98FF98; transform: rotateY(180deg); }
        .card.matched { background: #FFD700; cursor: default; }
        .moves { text-align: center; font-size: 20px; color: #2d8659; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="text-center">
        <h1 class="text-3xl font-bold text-green-800 mb-4">📚 Mảnh Ghép Hoàn Hảo</h1>
        <div class="moves">Lượt: <span id="moves">0</span></div>
      </div>
      <div id="gameBoard" class="game-board"></div>
      <script>
        const emojis = ['📚', '✏️', '📝', '💄', '🪞', '🧴', '🧼', '💎'];
        let cards = [...emojis, ...emojis];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        
        function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        
        function createBoard() {
          const board = document.getElementById('gameBoard');
          board.innerHTML = '';
          shuffle(cards).forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.textContent = '?';
            card.onclick = () => flipCard(card);
            board.appendChild(card);
          });
        }
        
        function flipCard(card) {
          if (flippedCards.length >= 2) return;
          if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
          
          card.classList.add('flipped');
          card.textContent = card.dataset.emoji;
          flippedCards.push(card);
          
          if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').textContent = moves;
            
            setTimeout(() => {
              if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                matchedPairs++;
                
                if (matchedPairs === emojis.length) {
                  setTimeout(() => {
                    alert(\`🎉 Hoàn thành! Bạn hoàn thành trong \${moves} lượt!\`);
                    window.close();
                    window.opener.gameCompleted('memory');
                  }, 500);
                }
              } else {
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
                flippedCards[0].textContent = '?';
                flippedCards[1].textContent = '?';
              }
              flippedCards = [];
            }, 1000);
          }
        }
        
        createBoard();
      </script>
    </body>
    </html>
  `);
};

// Global function for game completion
window.gameCompleted = (gameId) => {
  handleGameComplete(gameId);
};

export default App;
