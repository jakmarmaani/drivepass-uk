export type Category = {
  slug: string;
  en: string;
  ar: string;
  icon: string;
};

export const categories: Category[] = [
  { slug: 'alertness', en: 'Alertness', ar: 'الانتباه', icon: '👁️' },
  { slug: 'attitude', en: 'Attitude', ar: 'السلوك', icon: '🤝' },
  { slug: 'safety-vehicle', en: 'Safety and your vehicle', ar: 'السلامة والمركبة', icon: '🚗' },
  { slug: 'safety-margins', en: 'Safety margins', ar: 'مسافات الأمان', icon: '↔️' },
  { slug: 'hazard-awareness', en: 'Hazard awareness', ar: 'إدراك المخاطر', icon: '⚠️' },
  { slug: 'vulnerable-road-users', en: 'Vulnerable road users', ar: 'مستخدمو الطريق الأكثر عرضة للخطر', icon: '🚲' },
  { slug: 'other-vehicles', en: 'Other types of vehicle', ar: 'أنواع المركبات الأخرى', icon: '🚌' },
  { slug: 'vehicle-handling', en: 'Vehicle handling', ar: 'التحكم في المركبة', icon: '🛞' },
  { slug: 'motorway-rules', en: 'Motorway rules', ar: 'قواعد الطرق السريعة', icon: '🛣️' },
  { slug: 'rules-road', en: 'Rules of the road', ar: 'قواعد الطريق', icon: '📘' },
  { slug: 'road-signs', en: 'Road and traffic signs', ar: 'إشارات الطريق والمرور', icon: '🚸' },
  { slug: 'documents', en: 'Essential documents', ar: 'الوثائق الأساسية', icon: '📄' },
  { slug: 'incidents', en: 'Incidents and emergencies', ar: 'الحوادث والطوارئ', icon: '🚑' },
  { slug: 'vehicle-loading', en: 'Vehicle loading', ar: 'تحميل المركبة', icon: '📦' }
];
