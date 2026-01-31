
import React, { useState } from 'react';

interface HomeProps {
  onStart: (topic: string) => void;
  error: string | null;
}

const PRESET_TOPICS = [
  { id: 'tech', name: 'Web Development', icon: 'fa-code', color: 'bg-blue-500', note: 'For coders!' },
  { id: 'science', name: 'Space', icon: 'fa-user-astronaut', color: 'bg-purple-500', note: 'Outer space!' },
  { id: 'history', name: 'World History', icon: 'fa-landmark', color: 'bg-amber-500', note: 'Back in time!' },
  { id: 'math', name: 'Math Fun', icon: 'fa-calculator', color: 'bg-emerald-500', note: 'Numbers!' },
];

const Home: React.FC<HomeProps> = ({ onStart, error }) => {
  const [customTopic, setCustomTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onStart(customTopic.trim());
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Welcome to <span className="text-indigo-600">My Quiz App</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Hi! I'm <span className="text-slate-900 font-bold">Sovereign Hugo 303</span>. I built this app to help you test your knowledge on anything you want. Just pick a topic below or type your own!
        </p>
      </div>

      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <i className="fa-solid fa-face-frown text-red-500"></i>
          <span>{error}</span>
        </div>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRESET_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onStart(topic.name)}
            className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-indigo-400 hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center text-white text-xl shadow-md z-10`}>
              <i className={`fa-solid ${topic.icon}`}></i>
            </div>
            <div className="z-10">
              <h3 className="font-bold text-slate-800">{topic.name}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{topic.note}</p>
            </div>
            <i className="fa-solid fa-chevron-right ml-auto text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"></i>
          </button>
        ))}
      </div>

      <div className="w-full max-w-md">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 font-bold text-xs uppercase tracking-widest">Or try your own!</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Type any topic here..."
            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
          />
          <button
            type="submit"
            disabled={!customTopic.trim()}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
          >
            Start Quiz
            <i className="fa-solid fa-play text-sm"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
