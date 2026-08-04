import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { isQuestionBookmarked, saveAnswer, toggleBookmark } from '@/database/database';
import type { TheoryQuestion } from '@/types/question';

type Props = {
  titleEn: string;
  titleAr: string;
  questions: TheoryQuestion[];
  loading?: boolean;
};

export function QuizScreen({ titleEn, titleAr, questions, loading = false }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const question = useMemo(() => questions[index], [questions, index]);

  useEffect(() => {
    if (!question) return;
    isQuestionBookmarked(question.id).then(setBookmarked).catch(() => setBookmarked(false));
  }, [question]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#123B64" /></View>;
  }

  if (!question || questions.length === 0) {
    return <View style={styles.center}><Text style={styles.title}>No questions available</Text><Text style={styles.arabicCentre}>لا توجد أسئلة متاحة</Text></View>;
  }

  async function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === question.correctOption;
    if (correct) setScore((value) => value + 1);
    await saveAnswer(question.id, optionIndex, correct);
  }

  function next() {
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  async function bookmark() {
    setBookmarked(await toggleBookmark(question.id));
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.resultsTitle}>Test completed</Text>
          <Text style={styles.resultsArabic}>اكتمل الاختبار</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.score}>{score}/{questions.length}</Text>
            <Text style={styles.percentage}>{percentage}%</Text>
          </View>
          <Pressable style={styles.primaryButton} onPress={restart}>
            <Text style={styles.primaryText}>Try again</Text>
            <Text style={styles.primaryArabic}>حاول مرة أخرى</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.screenTitle}>{titleEn}</Text>
        <Text style={styles.screenTitleArabic}>{titleAr}</Text>

        <View style={styles.progressRow}>
          <Text>Question {index + 1} of {questions.length}</Text>
          <Text style={styles.rtl}>السؤال {index + 1} من {questions.length}</Text>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${((index + 1) / questions.length) * 100}%` }]} />
        </View>

        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{question.categoryEn}</Text>
              <Text style={styles.badgeArabic}>{question.categoryAr}</Text>
            </View>
            <Pressable onPress={bookmark}><Text style={styles.bookmarkText}>{bookmarked ? '★' : '☆'}</Text></Pressable>
          </View>

          <Text style={styles.questionEn}>{question.questionEn}</Text>
          <View style={styles.divider} />
          <Text style={styles.questionAr}>{question.questionAr}</Text>
        </View>

        {question.options.map((option, optionIndex) => {
          const correct = selected !== null && optionIndex === question.correctOption;
          const wrong = selected === optionIndex && optionIndex !== question.correctOption;

          return (
            <Pressable
              key={optionIndex}
              disabled={selected !== null}
              onPress={() => choose(optionIndex)}
              style={[styles.option, correct && styles.correct, wrong && styles.wrong]}
            >
              <Text style={styles.optionLetter}>{String.fromCharCode(65 + optionIndex)}</Text>
              <View style={styles.optionBody}>
                <Text style={styles.optionEn}>{option.en}</Text>
                <Text style={styles.optionAr}>{option.ar}</Text>
              </View>
            </Pressable>
          );
        })}

        {selected !== null && (
          <>
            <View style={[styles.feedback, selected === question.correctOption ? styles.feedbackCorrect : styles.feedbackWrong]}>
              <Text style={styles.feedbackTitle}>{selected === question.correctOption ? 'Correct' : 'Incorrect'}</Text>
              <Text style={styles.feedbackArabic}>{selected === question.correctOption ? 'إجابة صحيحة' : 'إجابة غير صحيحة'}</Text>
              <Text style={styles.explanation}>{question.explanationEn}</Text>
              <Text style={styles.explanationAr}>{question.explanationAr}</Text>
            </View>

            <Pressable style={styles.primaryButton} onPress={next}>
              <Text style={styles.primaryText}>{index === questions.length - 1 ? 'View results' : 'Next question'}</Text>
              <Text style={styles.primaryArabic}>{index === questions.length - 1 ? 'عرض النتيجة' : 'السؤال التالي'}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F7FA' },
  container: { padding: 18, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F4F7FA' },
  screenTitle: { fontSize: 23, fontWeight: '900', color: '#17324D' },
  screenTitleArabic: { fontSize: 21, fontWeight: '800', color: '#17324D', textAlign: 'right', writingDirection: 'rtl' },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginBottom: 8 },
  rtl: { writingDirection: 'rtl' },
  track: { height: 8, backgroundColor: '#DCE5EC', borderRadius: 8, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#178A55' },
  questionCard: { marginTop: 16, padding: 18, backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#DFE7EE' },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#E3F0FA', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  badgeText: { color: '#123B64', fontWeight: '800' },
  badgeArabic: { color: '#123B64', fontWeight: '700', writingDirection: 'rtl', marginTop: 2 },
  bookmarkText: { fontSize: 30, color: '#F4B400' },
  questionEn: { marginTop: 16, fontSize: 20, lineHeight: 29, fontWeight: '800', color: '#17324D' },
  divider: { height: 1, backgroundColor: '#E5EBF0', marginVertical: 15 },
  questionAr: { fontSize: 20, lineHeight: 33, fontWeight: '700', color: '#17324D', textAlign: 'right', writingDirection: 'rtl' },
  option: { flexDirection: 'row', alignItems: 'center', marginTop: 12, padding: 14, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 2, borderColor: '#DCE5EC' },
  correct: { borderColor: '#178A55', backgroundColor: '#E8F7EF' },
  wrong: { borderColor: '#C83A3A', backgroundColor: '#FCECEC' },
  optionLetter: { width: 36, height: 36, borderRadius: 18, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#E8EFF5', color: '#17324D', fontWeight: '900', lineHeight: 36 },
  optionBody: { flex: 1, marginLeft: 12 },
  optionEn: { color: '#263F55', fontSize: 15, fontWeight: '700' },
  optionAr: { color: '#41596E', fontSize: 16, marginTop: 5, textAlign: 'right', writingDirection: 'rtl' },
  feedback: { marginTop: 15, padding: 17, borderRadius: 17, borderWidth: 1 },
  feedbackCorrect: { backgroundColor: '#E8F7EF', borderColor: '#A7D9BD' },
  feedbackWrong: { backgroundColor: '#FCECEC', borderColor: '#E3B0B0' },
  feedbackTitle: { fontSize: 18, fontWeight: '900', color: '#17324D' },
  feedbackArabic: { fontSize: 18, fontWeight: '800', color: '#17324D', textAlign: 'right', writingDirection: 'rtl' },
  explanation: { marginTop: 12, color: '#40576B', lineHeight: 22 },
  explanationAr: { marginTop: 7, color: '#40576B', fontSize: 16, lineHeight: 26, textAlign: 'right', writingDirection: 'rtl' },
  primaryButton: { marginTop: 18, padding: 15, borderRadius: 16, alignItems: 'center', backgroundColor: '#123B64', minWidth: 220 },
  primaryText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  primaryArabic: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', marginTop: 3, writingDirection: 'rtl' },
  resultsTitle: { fontSize: 29, fontWeight: '900', color: '#17324D' },
  resultsArabic: { fontSize: 26, fontWeight: '800', color: '#17324D', marginTop: 7, writingDirection: 'rtl' },
  scoreCircle: { width: 170, height: 170, borderRadius: 85, marginTop: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E3F0FA', borderWidth: 7, borderColor: '#123B64' },
  score: { fontSize: 38, fontWeight: '900', color: '#123B64' },
  percentage: { fontSize: 20, fontWeight: '800', color: '#526779', marginTop: 3 },
  title: { fontSize: 24, fontWeight: '900', color: '#17324D' },
  arabicCentre: { marginTop: 6, color: '#17324D', fontSize: 17, writingDirection: 'rtl' }
});
