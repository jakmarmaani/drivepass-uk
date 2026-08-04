import { useMemo } from 'react';

import { CompleteQuiz } from '@/components/CompleteQuiz';
import { releaseQuestions } from '@/data/releaseQuestions';

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

export default function MockTestScreen() {
  const questions = useMemo(
    () => shuffle(releaseQuestions).slice(0, Math.min(50, releaseQuestions.length)),
    []
  );

  return (
    <CompleteQuiz
      mode="mock"
      questions={questions}
      durationMinutes={57}
    />
  );
}
