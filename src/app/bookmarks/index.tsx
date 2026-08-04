import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { QuizScreen } from '@/components/QuizScreen';
import { getBookmarkedQuestions } from '@/database/database';
import type { TheoryQuestion } from '@/types/question';

export default function BookmarksScreen() {
  const [questions, setQuestions] = useState<TheoryQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    getBookmarkedQuestions().then(setQuestions).finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  return <QuizScreen titleEn="Bookmarked questions" titleAr="الأسئلة المحفوظة" questions={questions} loading={loading} />;
}
