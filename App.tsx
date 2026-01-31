
import React, { useState, useCallback } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import LoadingScreen from './components/LoadingScreen';
import { Question, QuizResult, AppState } from './types';
import { generateQuizQuestions } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('home');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = useCallback(async (topic: string) => {
    setState('loading');
    setError(null);
    try {
      const generatedQuestions = await generateQuizQuestions(topic);
      setQuestions(generatedQuestions);
      setResults([]);
      setState('quiz');
    } catch (err) {
      console.error(err);
      setError("Oops! I couldn't get the quiz ready. Can you try again?");
      setState('home');
    }
  }, []);

  const handleQuizFinish = useCallback((finalResults: QuizResult[]) => {
    setResults(finalResults);
    setState('results');
  }, []);

  const restart = useCallback(() => {
    setState('home');
    setQuestions([]);
    setResults([]);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 font-bold text-xl text-slate-900 cursor-pointer group"
            onClick={restart}
          >
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-sm">
              <i className="fa-solid fa-pencil"></i>
            </div>
            <span>Hugo's <span className="text-indigo-600">Quiz App</span></span>
          </div>
          {state === 'quiz' && (
            <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Quiz Time!
            </div>
          )}
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        {state === 'home' && (
          <Home onStart={startQuiz} error={error} />
        )}

        {state === 'loading' && (
          <LoadingScreen />
        )}

        {state === 'quiz' && (
          <Quiz 
            questions={questions} 
            onFinish={handleQuizFinish} 
            onCancel={restart}
          />
        )}

        {state === 'results' && (
          <Results 
            questions={questions} 
            results={results} 
            onRestart={restart} 
          />
        )}
      </main>

      <footer className="py-12 text-center">
        <div className="text-slate-400 text-sm font-medium">
          <p>Made with ❤️ by <span className="text-slate-600 font-bold">Sovereign Hugo 303</span></p>
          <p className="mt-1 opacity-60">I hope you enjoy my first project!</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
