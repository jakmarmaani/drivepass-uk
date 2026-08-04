import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { trafficSigns } from '@/data/signs';

export default function SignsScreen() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return trafficSigns;
    return trafficSigns.filter((sign) =>
      `${sign.nameEn} ${sign.nameAr} ${sign.meaningEn} ${sign.meaningAr}`.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>UK Traffic Signs</Text>
      <Text style={styles.titleAr}>إشارات المرور البريطانية</Text>

      <TextInput value={query} onChangeText={setQuery} placeholder="Search signs | ابحث عن إشارة" style={styles.search} />

      {filtered.map((sign) => (
        <View key={sign.id} style={styles.card}>
          <Text style={styles.symbol}>{sign.symbol}</Text>
          <View style={styles.body}>
            <Text style={styles.category}>{sign.categoryEn}</Text>
            <Text style={styles.categoryAr}>{sign.categoryAr}</Text>
            <Text style={styles.name}>{sign.nameEn}</Text>
            <Text style={styles.nameAr}>{sign.nameAr}</Text>
            <Text style={styles.meaning}>{sign.meaningEn}</Text>
            <Text style={styles.meaningAr}>{sign.meaningAr}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, paddingBottom: 40, backgroundColor: '#F4F7FA' },
  title: { fontSize: 25, fontWeight: '900', color: '#17324D' },
  titleAr: { fontSize: 23, fontWeight: '800', color: '#17324D', textAlign: 'right', writingDirection: 'rtl' },
  search: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DFE7EE', borderRadius: 15, padding: 14, marginVertical: 16, fontSize: 16 },
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 13, borderWidth: 1, borderColor: '#DFE7EE' },
  symbol: { fontSize: 48, width: 70, textAlign: 'center' },
  body: { flex: 1 },
  category: { color: '#607386', fontSize: 12, fontWeight: '700' },
  categoryAr: { color: '#607386', fontSize: 13, textAlign: 'right', writingDirection: 'rtl' },
  name: { color: '#17324D', fontSize: 18, fontWeight: '900', marginTop: 8 },
  nameAr: { color: '#17324D', fontSize: 18, fontWeight: '800', textAlign: 'right', writingDirection: 'rtl', marginTop: 3 },
  meaning: { color: '#40576B', marginTop: 10, lineHeight: 21 },
  meaningAr: { color: '#40576B', fontSize: 16, lineHeight: 25, textAlign: 'right', writingDirection: 'rtl', marginTop: 5 }
});
