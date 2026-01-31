
import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "Just a second...",
  "Thinking of some good questions...",
  "Getting the quiz ready for you...",
  "Almost there!",
  "Hang tight!"
];

const LoadingScreen: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
      </div>
      
      <div className="text-center">
        <p className="text-xl font-bold text-slate-800">Wait a moment...</p>
        <p className="text-slate-400 mt-2 italic">
          {LOADING_MESSAGES[msgIdx]}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
