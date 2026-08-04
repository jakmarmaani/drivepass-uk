export type BilingualOption = {
  en: string;
  ar: string;
};

export type TheoryQuestion = {
  id: number;
  category: string;
  categoryEn: string;
  categoryAr: string;
  questionEn: string;
  questionAr: string;
  options: BilingualOption[];
  correctOption: number;
  explanationEn: string;
  explanationAr: string;
  image?: string;
};

export type AnswerRecord = {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  answeredAt: string;
};

export type ProgressSummary = {
  answered: number;
  correct: number;
  incorrect: number;
  percentage: number;
};
