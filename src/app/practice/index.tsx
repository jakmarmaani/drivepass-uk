import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { categories } from '@/data/categories';
import { getAllQuestions } from '@/database/database';
import type { TheoryQuestion } from '@/types/question';

export default function PracticeHome() {
  const [questions, setQuestions] = useState<TheoryQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllQuestions().then(setQuestions).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#123B64" /></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a category</Text>
      <Text style={styles.titleAr}>اختر فئة</Text>

      <Pressable style={styles.allCard} onPress={() => router.push('/practice/all')}>
        <Text style={styles.allTitle}>All questions ({questions.length})</Text>
        <Text style={styles.allAr}>جميع الأسئلة ({questions.length})</Text>
      </Pressable>

      {categories.map((category) => {
        const count = questions.filter((q) => q.category === category.slug).length;
        return (
          <Pressable
            key={category.slug}
            style={[styles.card, count === 0 && styles.disabled]}
            disabled={count === 0}
            onPress={() => router.push({ pathname: '/practice/[category]', params: { category: category.slug } })}
          >
            <Text style={styles.icon}>{category.icon}</Text>
            <View style={styles.body}>
              <Text style={styles.cardTitle}>{category.en}</Text>
              <Text style={styles.cardAr}>{category.ar}</Text>
              <Text style={styles.count}>{count} questions</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, paddingBottom: 40, backgroundColor: '#F4F7FA' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F7FA' },
  title: { fontSize: 25, fontWeight: '900', color: '#17324D' },
  titleAr: { fontSize: 23, fontWeight: '800', color: '#17324D', textAlign: 'right', writingDirection: 'rtl', marginBottom: 16 },
  allCard: { backgroundColor: '#123B64', padding: 18, borderRadius: 18, marginBottom: 15 },
  allTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  allAr: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', textAlign: 'right', writingDirection: 'rtl', marginTop: 3 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 17, padding: 15, marginBottom: 11, borderWidth: 1, borderColor: '#DFE7EE' },
  disabled: { opacity: 0.45 },
  icon: { fontSize: 28, width: 45 },
  body: { flex: 1 },
  cardTitle: { color: '#17324D', fontSize: 16, fontWeight: '800' },
  cardAr: { color: '#17324D', fontSize: 16, fontWeight: '700', textAlign: 'right', writingDirection: 'rtl', marginTop: 2 },
  count: { color: '#607386', marginTop: 6 },
  arrow: { color: '#123B64', fontSize: 30 },
});
