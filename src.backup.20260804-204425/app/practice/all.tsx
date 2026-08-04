import { useEffect, useState } from 'react';

import { QuizScreen } from '@/components/QuizScreen';
import { getAllQuestions } from '@/database/database';
import type { TheoryQuestion } from '@/types/question';

export default function AllPracticeScreen() {
  const [questions, setQuestions] = useState<TheoryQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllQuestions().then(setQuestions).finally(() => setLoading(false));
  }, []);

  return <QuizScreen titleEn="All practice questions" titleAr="جميع الأسئلة التدريبية" questions={questions} loading={loading} />;
}
