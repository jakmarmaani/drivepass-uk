import type { TheoryQuestion } from '@/types/content';

/**
 * Starter content only.
 * Import reviewed original questions through scripts/import-questions.mjs.
 */
export const releaseQuestions: TheoryQuestion[] = [
  {
    id: 1,
    category: 'alertness',
    categoryName: { en: 'Alertness', ar: 'الانتباه' },
    question: {
      en: 'You are driving in heavy rain. What should you do to improve visibility?',
      ar: 'أنت تقود في أمطار غزيرة. ماذا يجب أن تفعل لتحسين الرؤية؟',
    },
    options: [
      { en: 'Use dipped headlights', ar: 'استخدم المصابيح الأمامية المنخفضة' },
      { en: 'Use the horn continuously', ar: 'استخدم آلة التنبيه باستمرار' },
      { en: 'Drive close to the vehicle ahead', ar: 'قد بالقرب من المركبة التي أمامك' },
      { en: 'Use only parking lights', ar: 'استخدم أضواء الوقوف فقط' },
    ],
    correctOption: 0,
    explanation: {
      en: 'Dipped headlights help other road users see you without producing unnecessary glare.',
      ar: 'تساعد المصابيح الأمامية المنخفضة مستخدمي الطريق الآخرين على رؤيتك دون إحداث وهج غير ضروري.',
    },
    highwayCodeReference: 'Rules 113–116',
    difficulty: 'easy',
  },
  {
    id: 2,
    category: 'safety-margins',
    categoryName: { en: 'Safety margins', ar: 'مسافات الأمان' },
    question: {
      en: 'What should happen to your stopping distance on a wet road?',
      ar: 'ماذا يحدث لمسافة التوقف عند القيادة على طريق مبلل؟',
    },
    options: [
      { en: 'It should be at least doubled', ar: 'يجب أن تكون ضعف المسافة على الأقل' },
      { en: 'It remains the same', ar: 'تبقى كما هي' },
      { en: 'It becomes half as long', ar: 'تصبح نصف المسافة' },
      { en: 'It changes only at night', ar: 'تتغير فقط أثناء الليل' },
    ],
    correctOption: 0,
    explanation: {
      en: 'Wet roads reduce tyre grip, so stopping distances should be at least doubled.',
      ar: 'تقلل الطرق المبللة من تماسك الإطارات، لذلك يجب مضاعفة مسافة التوقف على الأقل.',
    },
    highwayCodeReference: 'Rule 126',
    difficulty: 'easy',
  },
  {
    id: 3,
    category: 'vulnerable-road-users',
    categoryName: { en: 'Vulnerable road users', ar: 'مستخدمو الطريق الأكثر عرضة للخطر' },
    question: {
      en: 'When overtaking a cyclist at speeds up to 30 mph, what minimum space should you normally leave?',
      ar: 'عند تجاوز راكب دراجة بسرعة تصل إلى 30 ميلاً في الساعة، ما الحد الأدنى للمسافة التي ينبغي تركها عادةً؟',
    },
    options: [
      { en: 'At least 1.5 metres', ar: 'ما لا يقل عن 1.5 متر' },
      { en: 'About 30 centimetres', ar: 'حوالي 30 سنتيمتراً' },
      { en: 'Only the width of your mirror', ar: 'عرض مرآة المركبة فقط' },
      { en: 'No extra space in a cycle lane', ar: 'لا حاجة لمسافة إضافية داخل مسار الدراجات' },
    ],
    correctOption: 0,
    explanation: {
      en: 'Give cyclists at least 1.5 metres at speeds up to 30 mph, and more space at higher speeds.',
      ar: 'اترك لراكبي الدراجات مسافة لا تقل عن 1.5 متر حتى سرعة 30 ميلاً في الساعة، ومسافة أكبر عند السرعات الأعلى.',
    },
    highwayCodeReference: 'Rule 163',
    difficulty: 'medium',
  },
  {
    id: 4,
    category: 'motorway-rules',
    categoryName: { en: 'Motorway rules', ar: 'قواعد الطرق السريعة' },
    question: {
      en: 'What should you do when joining a motorway from a slip road?',
      ar: 'ماذا يجب أن تفعل عند دخول الطريق السريع من طريق فرعي؟',
    },
    options: [
      { en: 'Match your speed to traffic and join when safe', ar: 'وافق سرعتك مع حركة المرور وادخل عندما يكون ذلك آمناً' },
      { en: 'Stop at the end of the slip road', ar: 'توقف عند نهاية الطريق الفرعي' },
      { en: 'Force motorway traffic to move', ar: 'أجبر حركة المرور على تغيير مسارها' },
      { en: 'Enter the right-hand lane immediately', ar: 'ادخل المسار الأيمن مباشرةً' },
    ],
    correctOption: 0,
    explanation: {
      en: 'Use the slip road to adjust speed and enter a suitable gap without forcing other traffic to change speed or direction.',
      ar: 'استخدم الطريق الفرعي لضبط السرعة والدخول في فجوة مناسبة دون إجبار الآخرين على تغيير السرعة أو الاتجاه.',
    },
    highwayCodeReference: 'Rule 259',
    difficulty: 'medium',
  },
  {
    id: 5,
    category: 'documents',
    categoryName: { en: 'Essential documents', ar: 'الوثائق الأساسية' },
    question: {
      en: 'What is the minimum legal motor insurance required to drive on public roads?',
      ar: 'ما الحد الأدنى القانوني لتأمين المركبة المطلوب للقيادة على الطرق العامة؟',
    },
    options: [
      { en: 'Third-party insurance', ar: 'تأمين الطرف الثالث' },
      { en: 'Breakdown cover', ar: 'تغطية الأعطال' },
      { en: 'Comprehensive insurance only', ar: 'التأمين الشامل فقط' },
      { en: 'Personal accident insurance', ar: 'تأمين الحوادث الشخصية' },
    ],
    correctOption: 0,
    explanation: {
      en: 'Third-party insurance is the minimum legal cover required.',
      ar: 'تأمين الطرف الثالث هو الحد الأدنى القانوني المطلوب.',
    },
    highwayCodeReference: 'Annex 3',
    difficulty: 'easy',
  },
];
