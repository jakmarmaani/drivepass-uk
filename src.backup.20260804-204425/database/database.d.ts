import type { AnswerRecord, ProgressSummary, TheoryQuestion } from '@/types/question';

export function initialiseDatabase(): Promise<void>;
export function getAllQuestions(): Promise<TheoryQuestion[]>;
export function getQuestionsByCategory(category: string): Promise<TheoryQuestion[]>;
export function saveAnswer(questionId: number, selectedOption: number, isCorrect: boolean): Promise<void>;
export function getAnswerHistory(): Promise<AnswerRecord[]>;
export function getProgressSummary(): Promise<ProgressSummary>;
export function toggleBookmark(questionId: number): Promise<boolean>;
export function isQuestionBookmarked(questionId: number): Promise<boolean>;
export function getBookmarkedQuestions(): Promise<TheoryQuestion[]>;
export function clearProgress(): Promise<void>;
export function getSetting(key: string): Promise<string | null>;
export function setSetting(key: string, value: string): Promise<void>;
