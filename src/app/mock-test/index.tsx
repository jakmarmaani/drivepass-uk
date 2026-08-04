import { useEffect, useMemo, useState } from 'react';

import { QuizScreen } from '@/components/QuizScreen';
import { getAllQuestions } from '@/database/database';
import type { TheoryQuestion } from '@/types/question';

function shuffled<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function MockTestScreen() {
  const [allQuestions, setAllQuestions] = useState<TheoryQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllQuestions().then(setAllQuestions).finally(() => setLoading(false));
  }, []);

  const mockQuestions = useMemo(() => shuffled(allQuestions).slice(0, Math.min(50, allQuestions.length)), [allQuestions]);

  return (
    <QuizScreen
      titleEn={`Mock test (${mockQuestions.length} questions)`}
      titleAr={`اختبار تجريبي (${mockQuestions.length} سؤالاً)`}
      questions={mockQuestions}
      loading={loading}
    />
  );
}
