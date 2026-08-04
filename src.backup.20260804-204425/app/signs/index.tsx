import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { releaseSigns } from '@/data/releaseSigns';

export default function SignsScreen() {
  const [query, setQuery] = useState('');

  const signs = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return releaseSigns;

    return releaseSigns.filter((sign) =>
      [
        sign.category.en,
        sign.category.ar,
        sign.name.en,
        sign.name.ar,
        sign.meaning.en,
        sign.meaning.ar,
      ]
        .join(' ')
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Traffic signs</Text>
      <Text style={styles.titleAr}>إشارات المرور</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search | بحث"
        style={styles.search}
      />

      {signs.map((sign) => (
        <View key={sign.id} style={styles.card}>
          <Text style={styles.symbol}>{sign.symbolFallback ?? '△'}</Text>

          <View style={styles.body}>
            <Text style={styles.category}>{sign.category.en}</Text>
            <Text style={styles.categoryAr}>{sign.category.ar}</Text>
            <Text style={styles.name}>{sign.name.en}</Text>
            <Text style={styles.nameAr}>{sign.name.ar}</Text>
            <Text style={styles.meaning}>{sign.meaning.en}</Text>
            <Text style={styles.meaningAr}>{sign.meaning.ar}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, paddingBottom: 40, backgroundColor: '#F4F7FA' },
  title: { fontSize: 26, fontWeight: '900', color: '#17324D' },
  titleAr: {
    fontSize: 23,
    fontWeight: '800',
    color: '#17324D',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  search: {
    marginVertical: 16,
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DFE7EE',
    backgroundColor: '#FFFFFF',
  },
  card: {
    marginBottom: 13,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DFE7EE',
    backgroundColor: '#FFFFFF',
  },
  symbol: { width: 70, fontSize: 48, textAlign: 'center' },
  body: { flex: 1 },
  category: { color: '#607386', fontSize: 12, fontWeight: '700' },
  categoryAr: {
    color: '#607386',
    fontSize: 13,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  name: {
    marginTop: 8,
    color: '#17324D',
    fontSize: 18,
    fontWeight: '900',
  },
  nameAr: {
    marginTop: 3,
    color: '#17324D',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  meaning: { marginTop: 10, color: '#40576B', lineHeight: 21 },
  meaningAr: {
    marginTop: 5,
    color: '#40576B',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
