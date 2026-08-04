import { questions } from '@/data/questions';
import type { AnswerRecord, ProgressSummary, TheoryQuestion } from '@/types/question';

const ANSWERS_KEY = 'drivepass_user_answers';
const BOOKMARKS_KEY = 'drivepass_bookmarks';
const SETTINGS_KEY = 'drivepass_settings';

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export async function initialiseDatabase(): Promise<void> {}
export async function getAllQuestions(): Promise<TheoryQuestion[]> { return questions; }
export async function getQuestionsByCategory(category: string): Promise<TheoryQuestion[]> {
  return questions.filter((q) => q.category === category);
}
export async function saveAnswer(questionId: number, selectedOption: number, isCorrect: boolean): Promise<void> {
  const answers = readJson<AnswerRecord[]>(ANSWERS_KEY, []);
  answers.push({ questionId, selectedOption, isCorrect, answeredAt: new Date().toISOString() });
  writeJson(ANSWERS_KEY, answers);
}
export async function getAnswerHistory(): Promise<AnswerRecord[]> {
  return readJson<AnswerRecord[]>(ANSWERS_KEY, []).reverse();
}
export async function getProgressSummary(): Promise<ProgressSummary> {
  const answers = readJson<AnswerRecord[]>(ANSWERS_KEY, []);
  const correct = answers.filter((a) => a.isCorrect).length;
  return {
    answered: answers.length,
    correct,
    incorrect: answers.length - correct,
    percentage: answers.length ? Math.round((correct / answers.length) * 100) : 0
  };
}
export async function toggleBookmark(questionId: number): Promise<boolean> {
  const bookmarks = readJson<number[]>(BOOKMARKS_KEY, []);
  const exists = bookmarks.includes(questionId);
  const updated = exists ? bookmarks.filter((id) => id !== questionId) : [...bookmarks, questionId];
  writeJson(BOOKMARKS_KEY, updated);
  return !exists;
}
export async function isQuestionBookmarked(questionId: number): Promise<boolean> {
  return readJson<number[]>(BOOKMARKS_KEY, []).includes(questionId);
}
export async function getBookmarkedQuestions(): Promise<TheoryQuestion[]> {
  const bookmarks = readJson<number[]>(BOOKMARKS_KEY, []);
  return questions.filter((q) => bookmarks.includes(q.id));
}
export async function clearProgress(): Promise<void> { writeJson(ANSWERS_KEY, []); }
export async function getSetting(key: string): Promise<string | null> {
  const settings = readJson<Record<string, string>>(SETTINGS_KEY, {});
  return settings[key] ?? null;
}
export async function setSetting(key: string, value: string): Promise<void> {
  const settings = readJson<Record<string, string>>(SETTINGS_KEY, {});
  settings[key] = value;
  writeJson(SETTINGS_KEY, settings);
}
