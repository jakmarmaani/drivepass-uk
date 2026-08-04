import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {
  clearAnswerRecords,
  getSettings,
  saveSettings,
  type AppSettings,
} from '@/services/storage';

const defaults: AppSettings = {
  arabicFirst: false,
  largeText: false,
  voiceEnabled: true,
};

export default function SettingsScreen() {
  const [settings, setLocalSettings] = useState<AppSettings>(defaults);

  useEffect(() => {
    getSettings().then(setLocalSettings);
  }, []);

  async function update(key: keyof AppSettings, value: boolean) {
    const next = { ...settings, [key]: value };
    setLocalSettings(next);
    await saveSettings(next);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.titleAr}>الإعدادات</Text>

      {[
        ['arabicFirst', 'Show Arabic first', 'عرض العربية أولاً'],
        ['largeText', 'Large text', 'نص كبير'],
        ['voiceEnabled', 'Voice reading', 'القراءة الصوتية'],
      ].map(([key, en, ar]) => (
        <View key={key} style={styles.row}>
          <View style={styles.body}>
            <Text style={styles.label}>{en}</Text>
            <Text style={styles.labelAr}>{ar}</Text>
          </View>
          <Switch
            value={settings[key as keyof AppSettings]}
            onValueChange={(value) =>
              update(key as keyof AppSettings, value)
            }
          />
        </View>
      ))}

      <Pressable style={styles.danger} onPress={clearAnswerRecords}>
        <Text style={styles.dangerText}>Reset all progress</Text>
        <Text style={styles.dangerAr}>مسح جميع بيانات التقدم</Text>
      </Pressable>

      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>Independent revision app</Text>
        <Text style={styles.noticeTitleAr}>تطبيق مستقل للمراجعة</Text>
        <Text style={styles.noticeText}>
          This application is not affiliated with or endorsed by DVSA.
        </Text>
        <Text style={styles.noticeTextAr}>
          هذا التطبيق غير تابع لوكالة معايير السائقين والمركبات ولا يمثلها رسمياً.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F7FA' },
  title: { fontSize: 27, fontWeight: '900', color: '#17324D' },
  titleAr: {
    marginBottom: 18,
    fontSize: 24,
    fontWeight: '800',
    color: '#17324D',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  row: {
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFE7EE',
    backgroundColor: '#FFFFFF',
  },
  body: { flex: 1 },
  label: { fontSize: 17, fontWeight: '800', color: '#17324D' },
  labelAr: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: '700',
    color: '#17324D',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  danger: {
    marginTop: 12,
    padding: 14,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#B42318',
  },
  dangerText: { color: '#FFFFFF', fontWeight: '900' },
  dangerAr: {
    marginTop: 3,
    color: '#FFFFFF',
    fontWeight: '800',
    writingDirection: 'rtl',
  },
  notice: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9D493',
    backgroundColor: '#FFF5D6',
  },
  noticeTitle: { color: '#6D5310', fontWeight: '900' },
  noticeTitleAr: {
    color: '#6D5310',
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  noticeText: { marginTop: 9, color: '#604F23', lineHeight: 21 },
  noticeTextAr: {
    marginTop: 6,
    color: '#604F23',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
