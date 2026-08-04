import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

import { questions as seedQuestions } from '@/data/questions';
import { TheoryQuestion } from '@/types/question';

const DATABASE_NAME = 'drivepass.db';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (Platform.OS === 'web') {
    throw new Error('SQLite device database is not used in the web preview.');
  }

  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initialiseDatabase(): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  const database = await getDatabase();

  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

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
      answered_at TEXT NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions(id)
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
      question_id INTEGER PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions(id)
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      setting_key TEXT PRIMARY KEY NOT NULL,
      setting_value TEXT NOT NULL
    );
  `);

  const result = await database.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) AS total FROM questions'
  );

  if ((result?.total ?? 0) === 0) {
    await seedDatabase(database);
  }
}

async function seedDatabase(
  database: SQLite.SQLiteDatabase
): Promise<void> {
  await database.withTransactionAsync(async () => {
    for (const question of seedQuestions) {
      await database.runAsync(
        `
          INSERT OR REPLACE INTO questions (
            id,
            category,
            category_en,
            category_ar,
            question_en,
            question_ar,
            options_json,
            correct_option,
            explanation_en,
            explanation_ar,
            image
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        question.id,
        question.category,
        question.categoryEn,
        question.categoryAr,
        question.questionEn,
        question.questionAr,
        JSON.stringify(question.options),
        question.correctOption,
        question.explanationEn,
        question.explanationAr,
        question.image ?? null
      );
    }
  });
}

type QuestionRow = {
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

function convertQuestionRow(row: QuestionRow): TheoryQuestion {
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
    image: row.image ?? undefined,
  };
}

export async function getAllQuestions(): Promise<TheoryQuestion[]> {
  if (Platform.OS === 'web') {
    return seedQuestions;
  }

  const database = await getDatabase();

  const rows = await database.getAllAsync<QuestionRow>(
    'SELECT * FROM questions ORDER BY id'
  );

  return rows.map(convertQuestionRow);
}

export async function getQuestionsByCategory(
  category: string
): Promise<TheoryQuestion[]> {
  if (Platform.OS === 'web') {
    return seedQuestions.filter(
      (question) => question.category === category
    );
  }

  const database = await getDatabase();

  const rows = await database.getAllAsync<QuestionRow>(
    'SELECT * FROM questions WHERE category = ? ORDER BY id',
    category
  );

  return rows.map(convertQuestionRow);
}

export async function saveAnswer(
  questionId: number,
  selectedOption: number,
  isCorrect: boolean
): Promise<void> {
  if (Platform.OS === 'web') {
    return;
  }

  const database = await getDatabase();

  await database.runAsync(
    `
      INSERT INTO user_answers (
        question_id,
        selected_option,
        is_correct,
        answered_at
      )
      VALUES (?, ?, ?, ?)
    `,
    questionId,
    selectedOption,
    isCorrect ? 1 : 0,
    new Date().toISOString()
  );
}

export async function toggleBookmark(
  questionId: number
): Promise<boolean> {
  if (Platform.OS === 'web') {
    return false;
  }

  const database = await getDatabase();

  const existing = await database.getFirstAsync<{ question_id: number }>(
    'SELECT question_id FROM bookmarks WHERE question_id = ?',
    questionId
  );

  if (existing) {
    await database.runAsync(
      'DELETE FROM bookmarks WHERE question_id = ?',
      questionId
    );

    return false;
  }

  await database.runAsync(
    `
      INSERT INTO bookmarks (question_id, created_at)
      VALUES (?, ?)
    `,
    questionId,
    new Date().toISOString()
  );

  return true;
}
