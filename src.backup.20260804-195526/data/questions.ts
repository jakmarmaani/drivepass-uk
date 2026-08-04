import { TheoryQuestion } from '@/types/question';

export const questions: TheoryQuestion[] = [
  {
    id: 1,
    category: 'alertness',
    categoryEn: 'Alertness',
    categoryAr: 'الانتباه',
    questionEn:
      'You are driving in heavy rain. What should you do to improve visibility?',
    questionAr:
      'أنت تقود في أمطار غزيرة. ماذا يجب أن تفعل لتحسين الرؤية؟',
    options: [
      {
        en: 'Use dipped headlights',
        ar: 'استخدم المصابيح الأمامية المنخفضة',
      },
      {
        en: 'Use the horn continuously',
        ar: 'استخدم آلة التنبيه باستمرار',
      },
      {
        en: 'Drive close to the vehicle ahead',
        ar: 'قد بالقرب من المركبة التي أمامك',
      },
      {
        en: 'Use only the parking lights',
        ar: 'استخدم أضواء الوقوف فقط',
      },
    ],
    correctOption: 0,
    explanationEn:
      'Dipped headlights help other road users see you without causing unnecessary glare.',
    explanationAr:
      'تساعد المصابيح الأمامية المنخفضة مستخدمي الطريق الآخرين على رؤيتك دون التسبب في وهج غير ضروري.',
  },
  {
    id: 2,
    category: 'safety-margins',
    categoryEn: 'Safety margins',
    categoryAr: 'مسافات الأمان',
    questionEn:
      'What should happen to your stopping distance on a wet road?',
    questionAr:
      'ماذا يحدث لمسافة التوقف عند القيادة على طريق مبلل؟',
    options: [
      {
        en: 'It should be at least doubled',
        ar: 'يجب أن تكون ضعف المسافة على الأقل',
      },
      {
        en: 'It remains the same',
        ar: 'تبقى كما هي',
      },
      {
        en: 'It becomes half as long',
        ar: 'تصبح نصف المسافة',
      },
      {
        en: 'It only changes at night',
        ar: 'تتغير فقط أثناء الليل',
      },
    ],
    correctOption: 0,
    explanationEn:
      'Wet roads reduce tyre grip, so stopping distances should be at least doubled.',
    explanationAr:
      'تقلل الطرق المبللة من تماسك الإطارات، لذلك يجب مضاعفة مسافة التوقف على الأقل.',
  },
  {
    id: 3,
    category: 'vulnerable-road-users',
    categoryEn: 'Vulnerable road users',
    categoryAr: 'مستخدمو الطريق الأكثر عرضة للخطر',
    questionEn:
      'You are passing a cyclist. How much space should you normally allow?',
    questionAr:
      'عند تجاوز راكب دراجة، ما مقدار المسافة التي يجب أن تتركها عادةً؟',
    options: [
      {
        en: 'At least 1.5 metres at speeds up to 30 mph',
        ar: 'ما لا يقل عن 1.5 متر عند سرعة تصل إلى 30 ميلاً في الساعة',
      },
      {
        en: 'About 30 centimetres',
        ar: 'حوالي 30 سنتيمتراً',
      },
      {
        en: 'Only enough space for your mirrors',
        ar: 'مسافة تكفي فقط لمرايا مركبتك',
      },
      {
        en: 'No space if the cyclist is in a cycle lane',
        ar: 'لا حاجة لمسافة إذا كان راكب الدراجة داخل مسار الدراجات',
      },
    ],
    correctOption: 0,
    explanationEn:
      'Give cyclists at least 1.5 metres when overtaking at speeds up to 30 mph, and more space at higher speeds.',
    explanationAr:
      'اترك لراكب الدراجة مسافة لا تقل عن 1.5 متر عند التجاوز بسرعة تصل إلى 30 ميلاً في الساعة، واترك مسافة أكبر عند السرعات الأعلى.',
  },
  {
    id: 4,
    category: 'motorway-rules',
    categoryEn: 'Motorway rules',
    categoryAr: 'قواعد الطرق السريعة',
    questionEn:
      'What should you do when joining a motorway from a slip road?',
    questionAr:
      'ماذا يجب أن تفعل عند دخول الطريق السريع من طريق فرعي؟',
    options: [
      {
        en: 'Match your speed to the traffic and join when safe',
        ar: 'قم بمواءمة سرعتك مع حركة المرور وادخل عندما يكون ذلك آمناً',
      },
      {
        en: 'Stop at the end of the slip road',
        ar: 'توقف عند نهاية الطريق الفرعي',
      },
      {
        en: 'Force other drivers to change lanes',
        ar: 'أجبر السائقين الآخرين على تغيير المسار',
      },
      {
        en: 'Drive directly into the right-hand lane',
        ar: 'ادخل مباشرة إلى المسار الأيمن',
      },
    ],
    correctOption: 0,
    explanationEn:
      'Use the slip road to adjust your speed and enter a suitable gap without forcing motorway traffic to change speed or direction.',
    explanationAr:
      'استخدم الطريق الفرعي لضبط سرعتك والدخول في فجوة مناسبة دون إجبار حركة المرور على الطريق السريع على تغيير السرعة أو الاتجاه.',
  },
  {
    id: 5,
    category: 'documents',
    categoryEn: 'Essential documents',
    categoryAr: 'الوثائق الأساسية',
    questionEn:
      'What is the minimum legal motor insurance required to drive on public roads?',
    questionAr:
      'ما الحد الأدنى القانوني لتأمين المركبة المطلوب للقيادة على الطرق العامة؟',
    options: [
      {
        en: 'Third-party insurance',
        ar: 'تأمين الطرف الثالث',
      },
      {
        en: 'Breakdown cover',
        ar: 'تغطية الأعطال',
      },
      {
        en: 'Comprehensive insurance only',
        ar: 'التأمين الشامل فقط',
      },
      {
        en: 'Personal accident insurance',
        ar: 'تأمين الحوادث الشخصية',
      },
    ],
    correctOption: 0,
    explanationEn:
      'Third-party insurance is the minimum legal insurance required to drive a motor vehicle on public roads.',
    explanationAr:
      'تأمين الطرف الثالث هو الحد الأدنى القانوني المطلوب لقيادة مركبة على الطرق العامة.',
  },
];
