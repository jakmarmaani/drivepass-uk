import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AnswerRecord } from '@/types/content';

const KEYS = {
  answers: 'drivepass.answers.v2',
  bookmarks: 'drivepass.bookmarks.v2',
  settings: 'drivepass.settings.v2',
};

export type AppSettings = {
  arabicFirst: boolean;
  largeText: boolean;
  voiceEnabled: boolean;
};

const defaultSettings: AppSettings = {
  arabicFirst: false,
  largeText: false,
  voiceEnabled: true,
};

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function recordAnswer(record: AnswerRecord): Promise<void> {
  const records = await readJson<AnswerRecord[]>(KEYS.answers, []);
  records.push(record);
  await writeJson(KEYS.answers, records);
}

export async function getAnswerRecords(): Promise<AnswerRecord[]> {
  return readJson<AnswerRecord[]>(KEYS.answers, []);
}

export async function getWrongQuestionIds(): Promise<number[]> {
  const records = await getAnswerRecords();
  const latest = new Map<number, AnswerRecord>();

  for (const record of records) latest.set(record.questionId, record);

  return [...latest.values()]
    .filter((record) => !record.isCorrect)
    .map((record) => record.questionId);
}

export async function clearAnswerRecords(): Promise<void> {
  await writeJson(KEYS.answers, []);
}

export async function getBookmarkIds(): Promise<number[]> {
  return readJson<number[]>(KEYS.bookmarks, []);
}

export async function isBookmarked(questionId: number): Promise<boolean> {
  return (await getBookmarkIds()).includes(questionId);
}

export async function toggleBookmark(questionId: number): Promise<boolean> {
  const ids = await getBookmarkIds();
  const exists = ids.includes(questionId);
  const updated = exists ? ids.filter((id) => id !== questionId) : [...ids, questionId];
  await writeJson(KEYS.bookmarks, updated);
  return !exists;
}

export async function getSettings(): Promise<AppSettings> {
  return readJson<AppSettings>(KEYS.settings, defaultSettings);
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await writeJson(KEYS.settings, settings);
}
