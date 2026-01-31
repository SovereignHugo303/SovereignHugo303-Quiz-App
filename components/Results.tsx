
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Question, QuizResult } from '../types';

interface ResultsProps {
  questions: Question[];
  results: QuizResult[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ questions, results, onRestart }) => {
  const score = useMemo(() => results.filter(r => r.isCorrect).length, [results]);
  const percentage = (score / questions.length) * 100;

  const chartData = [
    { name: 'Correct', value: score },
    { name: 'Wrong', value: questions.length - score },
  ];

  const COLORS = ['#4f46e5', '#f1f5f9'];

  const getResultFeedback = () => {
    if (percentage === 100) return { title: "You're Amazing!", text: "Wow, you got every single one right!", icon: "fa-star", color: "text-amber-500" };
    if (percentage >= 80) return { title: "Great Job!", text: "You really know your stuff!", icon: "fa-thumbs-up", color: "text-indigo-500" };
    if (percentage >= 60) return { title: "Nice Work!", text: "You did pretty well!", icon: "fa-smile", color: "text-emerald-500" };
    return { title: "Good Effort!", text: "Keep practicing, you'll get it!", icon: "fa-rocket", color: "text-slate-400" };
  };

  const feedback = getResultFeedback();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 md:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className={`text-7xl ${feedback.color}`}>
              <i className={`fa-solid ${feedback.icon}`}></i>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{feedback.title}</h2>
            <p className="text-slate-500 text-lg font-medium">{feedback.text}</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-6">
            <div className="h-48 w-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">{Math.round(percentage)}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done!</span>
              </div>
            </div>

            <div className="flex gap-8 text-center">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Correct</p>
                <p className="text-4xl font-black text-indigo-600">{score}</p>
              </div>
              <div className="w-px h-12 bg-slate-100 self-center"></div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mistakes</p>
                <p className="text-4xl font-black text-slate-300">{questions.length - score}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fa-solid fa-rotate-right"></i>
            Try Another Quiz
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
          Let's see the answers:
        </h3>
        
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const result = results.find(r => r.questionIndex === idx);
            const isCorrect = result?.isCorrect;
            
            return (
              <div 
                key={q.id} 
                className={`p-6 bg-white rounded-2xl border transition-all ${isCorrect ? 'border-emerald-100' : 'border-red-100'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {isCorrect ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>}
                  </div>
                  <div className="space-y-3 flex-1">
                    <p className="font-bold text-slate-800">{q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <span className="font-bold uppercase text-[9px] block opacity-50 mb-1">Your choice</span>
                        {q.options[result?.selectedOptionIndex || 0]}
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-xl border bg-slate-50 border-slate-200 text-slate-800">
                          <span className="font-bold uppercase text-[9px] block opacity-50 mb-1 text-emerald-600">The right one</span>
                          {q.options[q.correctAnswerIndex]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
