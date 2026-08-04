import type { TrafficSign } from '@/types/content';

export const releaseSigns: TrafficSign[] = [
  {
    id: 1,
    category: { en: 'Prohibition', ar: 'علامات المنع' },
    name: { en: 'No entry', ar: 'ممنوع الدخول' },
    meaning: {
      en: 'Vehicles must not enter this road.',
      ar: 'يُمنع على المركبات دخول هذا الطريق.',
    },
    symbolFallback: '⛔',
  },
  {
    id: 2,
    category: { en: 'Mandatory', ar: 'علامات إلزامية' },
    name: { en: 'Stop', ar: 'قف' },
    meaning: {
      en: 'Stop at the line and proceed only when it is safe.',
      ar: 'توقف عند الخط ثم تحرك فقط عندما يكون ذلك آمناً.',
    },
    symbolFallback: '🛑',
  },
  {
    id: 3,
    category: { en: 'Warning', ar: 'علامات التحذير' },
    name: { en: 'General warning', ar: 'تحذير عام' },
    meaning: {
      en: 'Be prepared for a hazard ahead.',
      ar: 'كن مستعداً لوجود خطر أمامك.',
    },
    symbolFallback: '⚠️',
  },
];
