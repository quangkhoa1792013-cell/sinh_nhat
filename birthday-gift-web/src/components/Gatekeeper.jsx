import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ShieldCheck } from 'lucide-react';

export default function Gatekeeper({ onUnlock }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === 'SANG-XIN-MIN-2026') {
      setIsSuccess(true);
      setTimeout(() => onUnlock(), 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-slate-800 p-4"
    >
      <div className="max-w-md w-full p-10 text-center bg-white/60 border-2 border-white/50 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : isSuccess ? { scale: [1, 1.2, 1] } : {}}
          className={`mb-8 inline-flex p-6 rounded-full ${
            isSuccess ? 'bg-mint-400 text-white' : 'bg-mint-100 text-mint-600'
          } shadow-inner`}
        >
          {isSuccess ? <Unlock size={48} /> : <Lock size={48} />}
        </motion.div>
        
        <h1 className="text-4xl font-black mb-3 text-mint-800 tracking-tight">DỪNG LẠI! 🛡️</h1>
        <p className="text-slate-500 mb-10 font-medium">Chị cần Key từ "Người Gác Cổng" để đi tiếp hành trình nhé.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Nhập khóa bí mật..."
              className="w-full px-6 py-4 bg-white/80 border-2 border-mint-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-mint-300/50 text-center uppercase tracking-[0.2em] font-black text-mint-700 transition-all placeholder:text-mint-200"
            />
          </div>
          
          <button 
            type="submit" 
            className={`w-full py-5 text-xl font-black rounded-2xl transition-all shadow-lg active:scale-95 ${
              isSuccess ? 'bg-mint-500 text-white' : 'bg-mint-400 hover:bg-mint-500 text-slate-900'
            }`}
          >
            {isSuccess ? 'ĐANG MỞ KHÓA...' : 'MỞ KHÓA NGAY'}
          </button>
        </form>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-red-500 font-bold flex items-center justify-center gap-2"
          >
            <span>❌ Key này sai rùi, xem lại app đi chị ơi!</span>
          </motion.p>
        )}
      </div>

      <div className="mt-12 flex items-center gap-2 text-mint-600/50 font-bold uppercase tracking-widest text-xs">
        <ShieldCheck size={16} />
        <span>Hành trình bí mật 2026</span>
      </div>
    </motion.div>
  );
}
