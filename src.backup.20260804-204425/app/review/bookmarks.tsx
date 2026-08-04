import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { CompleteQuiz } from '@/components/CompleteQuiz';
import { releaseQuestions } from '@/data/releaseQuestions';
import { getBookmarkIds } from '@/services/storage';
import type { TheoryQuestion } from '@/types/content';

export default function BookmarksScreen() {
  const [questions, setQuestions] = useState<TheoryQuestion[] | null>(null);

  useEffect(() => {
    getBookmarkIds().then((ids) => {
      setQuestions(releaseQuestions.filter((question) => ids.includes(question.id)));
    });
  }, []);

  if (!questions) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#123B64" />
      </View>
    );
  }

  return <CompleteQuiz mode="practice" questions={questions} />;
}
