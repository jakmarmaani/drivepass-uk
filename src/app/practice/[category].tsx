import { useLocalSearchParams } from 'expo-router';

import { CompleteQuiz } from '@/components/CompleteQuiz';
import { releaseQuestions } from '@/data/releaseQuestions';

export default function CategoryPracticeScreen() {
  const { category } = useLocalSearchParams<{
    category: string;
  }>();

  const questions = releaseQuestions.filter(
    (question) => question.category === category
  );

  return (
    <CompleteQuiz
      mode="practice"
      questions={questions}
    />
  );
}
