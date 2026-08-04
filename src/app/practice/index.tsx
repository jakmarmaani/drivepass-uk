import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { releaseQuestions } from '@/data/releaseQuestions';

type CategorySummary = {
  slug: string;
  en: string;
  ar: string;
  count: number;
};

export default function PracticeHome() {
  const categoryMap = new Map<string, CategorySummary>();

  for (const question of releaseQuestions) {
    const existing = categoryMap.get(question.category);

    if (existing) {
      existing.count += 1;
    } else {
      categoryMap.set(question.category, {
        slug: question.category,
        en: question.categoryName.en,
        ar: question.categoryName.ar,
        count: 1,
      });
    }
  }

  const categories = [...categoryMap.values()].sort((a, b) =>
    a.en.localeCompare(b.en)
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose a category</Text>
      <Text style={styles.titleArabic}>اختر فئة</Text>

      <Pressable
        style={styles.allCard}
        onPress={() => router.push('/practice/all')}
      >
        <Text style={styles.allTitle}>
          All questions ({releaseQuestions.length})
        </Text>

        <Text style={styles.allTitleArabic}>
          جميع الأسئلة ({releaseQuestions.length})
        </Text>
      </Pressable>

      {categories.map((category) => (
        <Pressable
          key={category.slug}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/practice/[category]',
              params: {
                category: category.slug,
              },
            })
          }
        >
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{category.en}</Text>

            <Text style={styles.cardTitleArabic}>
              {category.ar}
            </Text>

            <Text style={styles.count}>
              {category.count} questions
            </Text>

            <Text style={styles.countArabic}>
              {category.count} سؤالاً
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 40,
    backgroundColor: '#F4F7FA',
  },
  title: {
    color: '#17324D',
    fontSize: 26,
    fontWeight: '900',
  },
  titleArabic: {
    marginBottom: 18,
    color: '#17324D',
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  allCard: {
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#123B64',
  },
  allTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
  },
  allTitleArabic: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  card: {
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#DFE7EE',
    backgroundColor: '#FFFFFF',
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: '#17324D',
    fontSize: 17,
    fontWeight: '800',
  },
  cardTitleArabic: {
    marginTop: 3,
    color: '#17324D',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  count: {
    marginTop: 7,
    color: '#607386',
  },
  countArabic: {
    marginTop: 2,
    color: '#607386',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  arrow: {
    color: '#123B64',
    fontSize: 32,
  },
});
