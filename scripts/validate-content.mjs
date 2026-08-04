import fs from 'node:fs';
const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/validate-content.mjs questions.json'); process.exit(1); }
const questions = JSON.parse(fs.readFileSync(file,'utf8'));
if (!Array.isArray(questions)) throw new Error('Question bank must be an array.');
const ids = new Set();
questions.forEach((q,i)=>{
 const n=`Question ${i+1}`;
 if(!Number.isInteger(q.id)) throw new Error(`${n}: invalid id`);
 if(ids.has(q.id)) throw new Error(`${n}: duplicate id`);
 ids.add(q.id);
 if(!q.category) throw new Error(`${n}: missing category`);
 if(!q.question?.en||!q.question?.ar) throw new Error(`${n}: missing bilingual question`);
 if(!Array.isArray(q.options)||q.options.length!==4) throw new Error(`${n}: four options required`);
 if(q.options.some(o=>!o.en||!o.ar)) throw new Error(`${n}: bilingual options required`);
 if(![0,1,2,3].includes(q.correctOption)) throw new Error(`${n}: invalid correctOption`);
 if(!q.explanation?.en||!q.explanation?.ar) throw new Error(`${n}: bilingual explanation required`);
});
console.log(`Validated ${questions.length} questions.`);
