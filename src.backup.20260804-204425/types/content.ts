export type BilingualText = {
  en: string;
  ar: string;
};

export type QuestionOption = BilingualText;

export type TheoryQuestion = {
  id: number;
  category: string;
  categoryName: BilingualText;
  question: BilingualText;
  options: QuestionOption[];
  correctOption: number;
  explanation: BilingualText;
  highwayCodeReference?: string;
  image?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

export type AnswerRecord = {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  mode: 'practice' | 'mock';
  answeredAt: string;
};

export type TrafficSign = {
  id: number;
  category: BilingualText;
  name: BilingualText;
  meaning: BilingualText;
  image?: string;
  symbolFallback?: string;
};
