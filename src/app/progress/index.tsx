import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { clearProgress, getProgressSummary } from '@/database/database';
import type { ProgressSummary } from '@/types/question';

const empty: ProgressSummary = { answered: 0, correct: 0, incorrect: 0, percentage: 0 };

export default function ProgressScreen() {
  const [summary, setSummary] = useState<ProgressSummary>(empty);

  const load = useCallback(() => {
    getProgressSummary().then(setSummary);
  }, []);

  useFocusEffect(load);

  async function reset() {
    await clearProgress();
    await load();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Progress</Text>
      <Text style={styles.titleAr}>مستوى التقدم</Text>

      <View style={styles.circle}>
        <Text style={styles.percent}>{summary.percentage}%</Text>
        <Text style={styles.label}>Correct answers</Text>
        <Text style={styles.labelAr}>الإجابات الصحيحة</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}><Text style={styles.value}>{summary.answered}</Text><Text>Answered</Text><Text style={styles.rtl}>تمت الإجابة</Text></View>
        <View style={styles.card}><Text style={styles.value}>{summary.correct}</Text><Text>Correct</Text><Text style={styles.rtl}>صحيحة</Text></View>
        <View style={styles.card}><Text style={styles.value}>{summary.incorrect}</Text><Text>Incorrect</Text><Text style={styles.rtl}>خاطئة</Text></View>
      </View>

      <Pressable style={styles.reset} onPress={reset}>
        <Text style={styles.resetText}>Reset progress</Text>
        <Text style={styles.resetAr}>مسح التقدم</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, alignItems: 'center', backgroundColor: '#F4F7FA' },
  title: { fontSize: 27, fontWeight: '900', color: '#17324D' },
  titleAr: { fontSize: 24, fontWeight: '800', color: '#17324D', writingDirection: 'rtl', marginTop: 4 },
  circle: { width: 180, height: 180, borderRadius: 90, marginTop: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E3F0FA', borderWidth: 8, borderColor: '#123B64' },
  percent: { fontSize: 40, fontWeight: '900', color: '#123B64' },
  label: { color: '#526779', marginTop: 5 },
  labelAr: { color: '#526779', marginTop: 3, writingDirection: 'rtl' },
  grid: { width: '100%', flexDirection: 'row', gap: 10, marginTop: 28 },
  card: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#DFE7EE' },
  value: { fontSize: 27, fontWeight: '900', color: '#123B64' },
  rtl: { writingDirection: 'rtl', marginTop: 3 },
  reset: { marginTop: 28, backgroundColor: '#B42318', borderRadius: 15, paddingVertical: 13, paddingHorizontal: 28, alignItems: 'center' },
  resetText: { color: '#FFFFFF', fontWeight: '800' },
  resetAr: { color: '#FFFFFF', fontWeight: '700', writingDirection: 'rtl', marginTop: 3 },
});
