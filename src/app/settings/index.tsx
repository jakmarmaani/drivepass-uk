import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { getSetting, setSetting } from '@/database/database';

export default function SettingsScreen() {
  const [largeText, setLargeText] = useState(false);
  const [arabicFirst, setArabicFirst] = useState(false);

  useEffect(() => {
    Promise.all([getSetting('largeText'), getSetting('arabicFirst')]).then(([large, arabic]) => {
      setLargeText(large === 'true');
      setArabicFirst(arabic === 'true');
    });
  }, []);

  async function updateLarge(value: boolean) {
    setLargeText(value);
    await setSetting('largeText', String(value));
  }

  async function updateArabic(value: boolean) {
    setArabicFirst(value);
    await setSetting('arabicFirst', String(value));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.titleAr}>الإعدادات</Text>

      <View style={styles.row}>
        <View style={styles.body}>
          <Text style={styles.label}>Large text</Text>
          <Text style={styles.labelAr}>نص كبير</Text>
        </View>
        <Switch value={largeText} onValueChange={updateLarge} />
      </View>

      <View style={styles.row}>
        <View style={styles.body}>
          <Text style={styles.label}>Show Arabic first</Text>
          <Text style={styles.labelAr}>عرض العربية أولاً</Text>
        </View>
        <Switch value={arabicFirst} onValueChange={updateArabic} />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>About DrivePass UK</Text>
        <Text style={styles.infoAr}>حول درايف باس المملكة المتحدة</Text>
        <Text style={styles.infoText}>Independent revision app based on UK driving rules. Not affiliated with DVSA.</Text>
        <Text style={styles.infoTextAr}>تطبيق مراجعة مستقل مبني على قواعد القيادة في المملكة المتحدة، وغير تابع لوكالة DVSA.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: '#F4F7FA' },
  title: { fontSize: 27, fontWeight: '900', color: '#17324D' },
  titleAr: { fontSize: 24, fontWeight: '800', color: '#17324D', textAlign: 'right', writingDirection: 'rtl', marginBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 17, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#DFE7EE' },
  body: { flex: 1 },
  label: { fontSize: 17, fontWeight: '800', color: '#17324D' },
  labelAr: { fontSize: 17, fontWeight: '700', color: '#17324D', textAlign: 'right', writingDirection: 'rtl', marginTop: 3 },
  info: { backgroundColor: '#FFF5D6', borderRadius: 16, padding: 17, marginTop: 14, borderWidth: 1, borderColor: '#E9D493' },
  infoTitle: { fontSize: 17, fontWeight: '900', color: '#6D5310' },
  infoAr: { fontSize: 17, fontWeight: '800', color: '#6D5310', textAlign: 'right', writingDirection: 'rtl' },
  infoText: { marginTop: 10, color: '#604F23', lineHeight: 21 },
  infoTextAr: { marginTop: 7, color: '#604F23', fontSize: 16, lineHeight: 25, textAlign: 'right', writingDirection: 'rtl' }
});
