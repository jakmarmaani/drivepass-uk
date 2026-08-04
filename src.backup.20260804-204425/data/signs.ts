export type TrafficSign = {
  id: number;
  symbol: string;
  categoryEn: string;
  categoryAr: string;
  nameEn: string;
  nameAr: string;
  meaningEn: string;
  meaningAr: string;
};

export const trafficSigns: TrafficSign[] = [
  {
    id: 1,
    symbol: '⛔',
    categoryEn: 'Prohibition',
    categoryAr: 'علامات المنع',
    nameEn: 'No entry',
    nameAr: 'ممنوع الدخول',
    meaningEn: 'Vehicles must not enter this road.',
    meaningAr: 'يُمنع على المركبات دخول هذا الطريق.'
  },
  {
    id: 2,
    symbol: '🛑',
    categoryEn: 'Mandatory',
    categoryAr: 'علامات إلزامية',
    nameEn: 'Stop',
    nameAr: 'قف',
    meaningEn: 'Stop at the line and proceed only when safe.',
    meaningAr: 'توقف عند الخط ثم تحرك فقط عندما يكون ذلك آمناً.'
  },
  {
    id: 3,
    symbol: '⚠️',
    categoryEn: 'Warning',
    categoryAr: 'علامات التحذير',
    nameEn: 'General warning',
    nameAr: 'تحذير عام',
    meaningEn: 'Be prepared for a hazard ahead.',
    meaningAr: 'كن مستعداً لوجود خطر أمامك.'
  },
  {
    id: 4,
    symbol: '30',
    categoryEn: 'Speed limits',
    categoryAr: 'حدود السرعة',
    nameEn: 'Maximum speed 30 mph',
    nameAr: 'السرعة القصوى 30 ميلاً في الساعة',
    meaningEn: 'Do not exceed 30 mph.',
    meaningAr: 'لا تتجاوز سرعة 30 ميلاً في الساعة.'
  }
];
