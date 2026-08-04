import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
const output =
  process.argv[3] ??
  path.join(process.cwd(), 'src', 'data', 'importedQuestions.json');

if (!input) {
  console.error('Usage: node scripts/import-questions.mjs questions.json [output.json]');
  process.exit(1);
}

const source = JSON.parse(fs.readFileSync(input, 'utf8'));

if (!Array.isArray(source)) {
  throw new Error('The source file must contain a JSON array.');
}

const seen = new Set();

for (const [index, question] of source.entries()) {
  const prefix = `Question ${index + 1}`;

  if (!Number.isInteger(question.id)) throw new Error(`${prefix}: invalid id`);
  if (seen.has(question.id)) throw new Error(`${prefix}: duplicate id ${question.id}`);
  seen.add(question.id);

  if (!question.category) throw new Error(`${prefix}: missing category`);
  if (!question.categoryName?.en || !question.categoryName?.ar) {
    throw new Error(`${prefix}: missing bilingual category name`);
  }
  if (!question.question?.en || !question.question?.ar) {
    throw new Error(`${prefix}: missing bilingual question`);
  }
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    throw new Error(`${prefix}: exactly four options are required`);
  }
  if (question.options.some((option) => !option.en || !option.ar)) {
    throw new Error(`${prefix}: every option needs English and Arabic`);
  }
  if (
    !Number.isInteger(question.correctOption) ||
    question.correctOption < 0 ||
    question.correctOption > 3
  ) {
    throw new Error(`${prefix}: correctOption must be 0, 1, 2 or 3`);
  }
  if (!question.explanation?.en || !question.explanation?.ar) {
    throw new Error(`${prefix}: missing bilingual explanation`);
  }
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(source, null, 2)}\n`);

console.log(`Validated and wrote ${source.length} questions to ${output}`);
