import { CompleteQuiz } from '@/components/CompleteQuiz';
import { releaseQuestions } from '@/data/releaseQuestions';

export default function AllPracticeScreen() {
  return (
    <CompleteQuiz
      mode="practice"
      questions={releaseQuestions}
    />
  );
}
