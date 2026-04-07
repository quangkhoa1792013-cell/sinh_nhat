import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

const QUESTIONS = [
  {
    q: "Người tặng quà này hiện đang học lớp nào?",
    options: ["7A1", "7A2", "7A3", "7A4"],
    correct: 2
  },
  {
    q: "Món quà này được tặng vào dịp nào?",
    options: ["Tết Trung Thu", "Sinh nhật", "Giáng sinh", "Ngày Quốc tế Phụ nữ"],
    correct: 1
  },
  {
    q: "Trong túi quà có gì nhỉ?",
    options: ["Bánh kẹo", "Gấu bông", "Sữa tắm & Tẩy trang", "Sách vở"],
    correct: 2
  }
];

export default function QuizGame({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx) => {
    setSelected(idx);
    const correct = idx === QUESTIONS[current].correct;
    setIsCorrect(correct);
    
    setTimeout(() => {
      if (correct) {
        if (current < QUESTIONS.length - 1) {
          setCurrent(prev => prev + 1);
          setSelected(null);
          setIsCorrect(null);
        } else {
          setFinished(true);
        }
      } else {
        setSelected(null);
        setIsCorrect(null);
      }
    }, 1000);
  };

  return (
    <div className="p-6 bg-white/50 rounded-2xl border-2 border-softpink-200">
      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-softpink-600 mb-2">
              <HelpCircle />
              <span className="font-bold">Câu hỏi {current + 1} / {QUESTIONS.length}</span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800">{QUESTIONS[current].q}</h2>
            
            <div className="grid gap-3">
              {QUESTIONS[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`p-4 rounded-xl text-left transition-all border-2 flex items-center justify-between ${
                    selected === idx 
                      ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700')
                      : 'bg-white border-slate-200 hover:border-softpink-400'
                  }`}
                >
                  {opt}
                  {selected === idx && (isCorrect ? <CheckCircle2 size={20}/> : <XCircle size={20}/>)}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">QUÁ ĐỈNH!</h2>
            <p className="text-slate-600 mb-6">M nhớ mọi thứ về t luôn hả? Wow!</p>
            <button onClick={onComplete} className="btn-secondary w-full py-3">
              TIẾP TỤC HÀNH TRÌNH
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
