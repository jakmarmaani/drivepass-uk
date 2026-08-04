import * as SQLite from 'expo-sqlite';

import { questions as seedQuestions } from '@/data/questions';
import type { AnswerRecord, ProgressSummary, TheoryQuestion } from '@/types/question';

const DATABASE_NAME = 'drivepass.db';
let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDatabase() {
  if (!databasePromise) databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  return databasePromise;
}

export async function initialiseDatabase(): Promise<void> {
  const database = await getDatabase();

  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY NOT NULL,
      category TEXT NOT NULL,
      category_en TEXT NOT NULL,
      category_ar TEXT NOT NULL,
      question_en TEXT NOT NULL,
      question_ar TEXT NOT NULL,
      options_json TEXT NOT NULL,
      correct_option INTEGER NOT NULL,
      explanation_en TEXT NOT NULL,
      explanation_ar TEXT NOT NULL,
      image TEXT
    );
    CREATE TABLE IF NOT EXISTS user_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      selected_option INTEGER NOT NULL,
      is_correct INTEGER NOT NULL,
      answered_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS bookmarks (
      question_id INTEGER PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS app_settings (
      setting_key TEXT PRIMARY KEY NOT NULL,
      setting_value TEXT NOT NULL
    );
  `);

  const result = await database.getFirstAsync<{ total: number }>('SELECT COUNT(*) AS total FROM questions');

  if ((result?.total ?? 0) === 0) {
    await database.withTransactionAsync(async () => {
      for (const q of seedQuestions) {
        await database.runAsync(
          `INSERT INTO questions (
            id, category, category_en, category_ar, question_en, question_ar,
            options_json, correct_option, explanation_en, explanation_ar, image
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          q.id, q.category, q.categoryEn, q.categoryAr, q.questionEn, q.questionAr,
          JSON.stringify(q.options), q.correctOption, q.explanationEn, q.explanationAr, q.image ?? null
        );
      }
    });
  }
}

type Row = {
  id: number;
  category: string;
  category_en: string;
  category_ar: string;
  question_en: string;
  question_ar: string;
  options_json: string;
  correct_option: number;
  explanation_en: string;
  explanation_ar: string;
  image: string | null;
};

function mapRow(row: Row): TheoryQuestion {
  return {
    id: row.id,
    category: row.category,
    categoryEn: row.category_en,
    categoryAr: row.category_ar,
    questionEn: row.question_en,
    questionAr: row.question_ar,
    options: JSON.parse(row.options_json),
    correctOption: row.correct_option,
    explanationEn: row.explanation_en,
    explanationAr: row.explanation_ar,
    image: row.image ?? undefined
  };
}

export async function getAllQuestions(): Promise<TheoryQuestion[]> {
  const database = await getDatabase();
  return (await database.getAllAsync<Row>('SELECT * FROM questions ORDER BY id')).map(mapRow);
}
export async function getQuestionsByCategory(category: string): Promise<TheoryQuestion[]> {
  const database = await getDatabase();
  return (await database.getAllAsync<Row>('SELECT * FROM questions WHERE category = ? ORDER BY id', category)).map(mapRow);
}
export async function saveAnswer(questionId: number, selectedOption: number, isCorrect: boolean): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT INTO user_answers (question_id, selected_option, is_correct, answered_at) VALUES (?, ?, ?, ?)',
    questionId, selectedOption, isCorrect ? 1 : 0, new Date().toISOString()
  );
}
export async function getAnswerHistory(): Promise<AnswerRecord[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<{question_id:number;selected_option:number;is_correct:number;answered_at:string}>(
    'SELECT question_id, selected_option, is_correct, answered_at FROM user_answers ORDER BY id DESC'
  );
  return rows.map((r) => ({
    questionId: r.question_id,
    selectedOption: r.selected_option,
    isCorrect: r.is_correct === 1,
    answeredAt: r.answered_at
  }));
}
export async function getProgressSummary(): Promise<ProgressSummary> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{answered:number;correct:number}>(
    'SELECT COUNT(*) AS answered, COALESCE(SUM(is_correct),0) AS correct FROM user_answers'
  );
  const answered = row?.answered ?? 0;
  const correct = row?.correct ?? 0;
  return { answered, correct, incorrect: answered - correct, percentage: answered ? Math.round((correct / answered) * 100) : 0 };
}
export async function toggleBookmark(questionId: number): Promise<boolean> {
  const database = await getDatabase();
  const existing = await database.getFirstAsync<{question_id:number}>('SELECT question_id FROM bookmarks WHERE question_id = ?', questionId);
  if (existing) {
    await database.runAsync('DELETE FROM bookmarks WHERE question_id = ?', questionId);
    return false;
  }
  await database.runAsync('INSERT INTO bookmarks (question_id, created_at) VALUES (?, ?)', questionId, new Date().toISOString());
  return true;
}
export async function isQuestionBookmarked(questionId: number): Promise<boolean> {
  const database = await getDatabase();
  const existing = await database.getFirstAsync<{question_id:number}>('SELECT question_id FROM bookmarks WHERE question_id = ?', questionId);
  return Boolean(existing);
}
export async function getBookmarkedQuestions(): Promise<TheoryQuestion[]> {
  const database = await getDatabase();
  return (await database.getAllAsync<Row>(
    'SELECT q.* FROM questions q INNER JOIN bookmarks b ON b.question_id = q.id ORDER BY b.created_at DESC'
  )).map(mapRow);
}
export async function clearProgress(): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM user_answers');
}
export async function getSetting(key: string): Promise<string | null> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{setting_value:string}>('SELECT setting_value FROM app_settings WHERE setting_key = ?', key);
  return row?.setting_value ?? null;
}
export async function setSetting(key: string, value: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    `INSERT INTO app_settings (setting_key, setting_value)
     VALUES (?, ?)
     ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value`,
    key, value
  );
}
