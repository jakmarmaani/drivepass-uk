import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { QuizScreen } from '@/components/QuizScreen';
import { getQuestionsByCategory } from '@/database/database';
import type { TheoryQuestion } from '@/types/question';

export default function CategoryPracticeScreen() {
  const params = useLocalSearchParams<{ category: string }>();
  const [questions, setQuestions] = useState<TheoryQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionsByCategory(params.category).then(setQuestions).finally(() => setLoading(false));
  }, [params.category]);

  const first = questions[0];

  return (
    <QuizScreen
      titleEn={first?.categoryEn ?? 'Practice'}
      titleAr={first?.categoryAr ?? 'التدريب'}
      questions={questions}
      loading={loading}
    />
  );
}
