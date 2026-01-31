
import React, { useState, useEffect } from 'react';
import { Question, QuizResult } from '../types';

interface QuizProps {
  questions: Question[];
  onFinish: (results: QuizResult[]) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinish, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [progress, setProgress] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    setProgress(((currentIndex + 1) / questions.length) * 100);
  }, [currentIndex, questions.length]);

  const handleNext = () => {
    if (selectedOption === null) return;

    const newResult: QuizResult = {
      questionIndex: currentIndex,
      selectedOptionIndex: selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswerIndex,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    if (isLastQuestion) {
      onFinish(updatedResults);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="flex justify-between items-end px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-xs font-bold text-indigo-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <h2 className="text-2xl font-bold text-slate-800 leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`
                flex items-center p-4 rounded-2xl border-2 text-left transition-all
                ${selectedOption === idx 
                  ? 'border-indigo-500 bg-indigo-50/50' 
                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                }
              `}
            >
              <div className={`
                w-7 h-7 rounded-lg flex items-center justify-center mr-4 text-xs font-bold transition-all
                ${selectedOption === idx 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-white border-2 border-slate-200 text-slate-400'
                }
              `}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className={`font-medium ${selectedOption === idx ? 'text-indigo-900' : 'text-slate-700'}`}>
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-1">
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-red-500 font-bold text-sm transition-colors"
        >
          Quit
        </button>
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`
            px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2
            ${selectedOption === null
              ? 'bg-slate-200 text-slate-400'
              : 'bg-indigo-600 text-white shadow-md hover:translate-y-[-2px]'
            }
          `}
        >
          {isLastQuestion ? 'See Score' : 'Next'}
          {!isLastQuestion && <i className="fa-solid fa-arrow-right text-xs"></i>}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
