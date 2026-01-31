
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizResult {
  questionIndex: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export type AppState = 'home' | 'loading' | 'quiz' | 'results';
