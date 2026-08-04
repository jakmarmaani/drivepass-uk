import fs from 'node:fs';

const file = process.argv[2];

if (!file) {
  console.error(
    'Usage: node scripts/validate-signs.mjs src/data/traffic-signs.json'
  );
  process.exit(1);
}

const signs = JSON.parse(
  fs.readFileSync(file, 'utf8')
);

if (!Array.isArray(signs)) {
  throw new Error('Traffic signs must be stored in a JSON array.');
}

const ids = new Set();

for (const [index, sign] of signs.entries()) {
  const label = `Sign ${index + 1}`;

  if (!Number.isInteger(sign.id)) {
    throw new Error(`${label}: invalid id`);
  }

  if (ids.has(sign.id)) {
    throw new Error(`${label}: duplicate id ${sign.id}`);
  }

  ids.add(sign.id);

  if (!sign.category?.en || !sign.category?.ar) {
    throw new Error(`${label}: missing bilingual category`);
  }

  if (!sign.name?.en || !sign.name?.ar) {
    throw new Error(`${label}: missing bilingual name`);
  }

  if (!sign.meaning?.en || !sign.meaning?.ar) {
    throw new Error(`${label}: missing bilingual meaning`);
  }

  if (!sign.image && !sign.symbolFallback) {
    throw new Error(
      `${label}: an image or fallback symbol is required`
    );
  }
}

console.log(`Validated ${signs.length} traffic signs.`);
