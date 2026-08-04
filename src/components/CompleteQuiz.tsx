import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { speakArabic, speakEnglish, stopSpeech } from '@/services/speech';
import {
  isBookmarked,
  recordAnswer,
  toggleBookmark,
} from '@/services/storage';
import type { TheoryQuestion } from '@/types/content';

type QuizMode = 'practice' | 'mock';

type Props = {
  questions: TheoryQuestion[];
  mode: QuizMode;
  durationMinutes?: number;
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function CompleteQuiz({
  questions,
  mode,
  durationMinutes = 57,
}: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  const question = questions[index];
  const selected = question ? answers[question.id] : undefined;
  const immediateFeedback = mode === 'practice' && selected !== undefined;

  useEffect(() => {
    if (!question) return;
    isBookmarked(question.id).then(setBookmarked);
    return () => {
      stopSpeech();
    };
  }, [question]);

  useEffect(() => {
    if (mode !== 'mock' || finished) return;

    const timer = setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, finished]);

  const score = useMemo(
    () =>
      questions.reduce(
        (total, item) =>
          total + (answers[item.id] === item.correctOption ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  async function selectAnswer(optionIndex: number) {
    if (!question) return;
    if (mode === 'practice' && selected !== undefined) return;

    setAnswers((current) => ({
      ...current,
      [question.id]: optionIndex,
    }));

    await recordAnswer({
      questionId: question.id,
      selectedOption: optionIndex,
      isCorrect: optionIndex === question.correctOption,
      mode,
      answeredAt: new Date().toISOString(),
    });
  }

  async function changeBookmark() {
    if (!question) return;
    setBookmarked(await toggleBookmark(question.id));
  }

  function toggleMarked() {
    if (!question) return;

    setMarked((current) =>
      current.includes(question.id)
        ? current.filter((id) => id !== question.id)
        : [...current, question.id]
    );
  }

  function next() {
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
  }

  function previous() {
    setIndex((value) => Math.max(0, value - 1));
  }

  if (!question) {
    return (
      <View style={styles.centre}>
        <Text style={styles.heading}>No questions available</Text>
        <Text style={styles.arabicCentre}>لا توجد أسئلة متاحة</Text>
      </View>
    );
  }

  if (finished) {
    const percentage = questions.length
      ? Math.round((score / questions.length) * 100)
      : 0;

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centre}>
          <Text style={styles.resultTitle}>Test completed</Text>
          <Text style={styles.resultArabic}>اكتمل الاختبار</Text>

          <View style={styles.resultCircle}>
            <Text style={styles.resultScore}>
              {score}/{questions.length}
            </Text>
            <Text style={styles.resultPercentage}>{percentage}%</Text>
          </View>

          <Text style={styles.resultText}>
            {mode === 'mock'
              ? percentage >= 86
                ? 'Practice pass'
                : 'More revision recommended'
              : 'Practice session complete'}
          </Text>

          <Text style={styles.resultTextArabic}>
            {mode === 'mock'
              ? percentage >= 86
                ? 'نجاح في الاختبار التدريبي'
                : 'يُنصح بمزيد من المراجعة'
              : 'اكتملت جلسة التدريب'}
          </Text>

          <Pressable
            style={styles.primary}
            onPress={() => {
              setIndex(0);
              setAnswers({});
              setMarked([]);
              setSecondsLeft(durationMinutes * 60);
              setFinished(false);
            }}
          >
            <Text style={styles.primaryText}>Restart</Text>
            <Text style={styles.primaryArabic}>إعادة الاختبار</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.progress}>
            {index + 1}/{questions.length}
          </Text>
          {mode === 'mock' && (
            <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
          )}
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((index + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>

        <View style={styles.toolbar}>
          <Pressable onPress={changeBookmark}>
            <Text style={styles.toolbarIcon}>{bookmarked ? '★' : '☆'}</Text>
          </Pressable>

          {mode === 'mock' && (
            <Pressable onPress={toggleMarked}>
              <Text style={styles.markButton}>
                {marked.includes(question.id) ? 'Marked ✓' : 'Mark for review'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.category}>{question.categoryName.en}</Text>
          <Text style={styles.categoryAr}>{question.categoryName.ar}</Text>

          <Text style={styles.questionEn}>{question.question.en}</Text>
          <Pressable
            style={styles.voiceButton}
            onPress={() => speakEnglish(question.question.en)}
          >
            <Text>🔊 Read English</Text>
          </Pressable>

          <View style={styles.divider} />

          <Text style={styles.questionAr}>{question.question.ar}</Text>
          <Pressable
            style={styles.voiceButton}
            onPress={() => speakArabic(question.question.ar)}
          >
            <Text style={styles.rtl}>🔊 قراءة العربية</Text>
          </Pressable>
        </View>

        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrect =
            immediateFeedback && optionIndex === question.correctOption;
          const isWrong =
            immediateFeedback &&
            isSelected &&
            optionIndex !== question.correctOption;

          return (
            <Pressable
              key={optionIndex}
              onPress={() => selectAnswer(optionIndex)}
              style={[
                styles.option,
                isSelected && styles.selected,
                isCorrect && styles.correct,
                isWrong && styles.wrong,
              ]}
            >
              <Text style={styles.optionLetter}>
                {String.fromCharCode(65 + optionIndex)}
              </Text>
              <View style={styles.optionBody}>
                <Text style={styles.optionEn}>{option.en}</Text>
                <Text style={styles.optionAr}>{option.ar}</Text>
              </View>
            </Pressable>
          );
        })}

        {immediateFeedback && (
          <View
            style={[
              styles.feedback,
              selected === question.correctOption
                ? styles.feedbackCorrect
                : styles.feedbackWrong,
            ]}
          >
            <Text style={styles.feedbackHeading}>
              {selected === question.correctOption ? 'Correct' : 'Incorrect'}
            </Text>
            <Text style={styles.feedbackHeadingAr}>
              {selected === question.correctOption
                ? 'إجابة صحيحة'
                : 'إجابة غير صحيحة'}
            </Text>
            <Text style={styles.explanation}>{question.explanation.en}</Text>
            <Text style={styles.explanationAr}>{question.explanation.ar}</Text>
            {question.highwayCodeReference && (
              <Text style={styles.reference}>
                Highway Code: {question.highwayCodeReference}
              </Text>
            )}
          </View>
        )}

        <View style={styles.navigation}>
          <Pressable
            style={[styles.secondary, index === 0 && styles.disabled]}
            disabled={index === 0}
            onPress={previous}
          >
            <Text>Previous</Text>
            <Text style={styles.rtl}>السابق</Text>
          </Pressable>

          <Pressable style={styles.primarySmall} onPress={next}>
            <Text style={styles.primaryText}>
              {index === questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
            <Text style={styles.primaryArabic}>
              {index === questions.length - 1 ? 'إنهاء' : 'التالي'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F7FA' },
  container: { padding: 18, paddingBottom: 42 },
  centre: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F7FA',
  },
  heading: { fontSize: 24, fontWeight: '900', color: '#17324D' },
  arabicCentre: {
    marginTop: 8,
    fontSize: 20,
    color: '#17324D',
    writingDirection: 'rtl',
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progress: { fontWeight: '800', color: '#526779' },
  timer: { fontWeight: '900', color: '#B42318', fontSize: 18 },
  progressTrack: {
    height: 8,
    marginTop: 9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#DCE5EC',
  },
  progressFill: { height: '100%', backgroundColor: '#178A55' },
  toolbar: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarIcon: { fontSize: 31, color: '#F4B400' },
  markButton: {
    color: '#123B64',
    fontWeight: '800',
    borderWidth: 1,
    borderColor: '#AFC5D8',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  questionCard: {
    marginTop: 12,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFE7EE',
  },
  category: { color: '#123B64', fontWeight: '900' },
  categoryAr: {
    color: '#123B64',
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  questionEn: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '800',
    color: '#17324D',
  },
  questionAr: {
    fontSize: 20,
    lineHeight: 33,
    fontWeight: '700',
    color: '#17324D',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  divider: { height: 1, marginVertical: 15, backgroundColor: '#E5EBF0' },
  voiceButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#E3F0FA',
  },
  rtl: { writingDirection: 'rtl' },
  option: {
    marginTop: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#DCE5EC',
    backgroundColor: '#FFFFFF',
  },
  selected: { borderColor: '#123B64' },
  correct: { borderColor: '#178A55', backgroundColor: '#E8F7EF' },
  wrong: { borderColor: '#C83A3A', backgroundColor: '#FCECEC' },
  optionLetter: {
    width: 36,
    height: 36,
    lineHeight: 36,
    textAlign: 'center',
    borderRadius: 18,
    backgroundColor: '#E8EFF5',
    color: '#17324D',
    fontWeight: '900',
  },
  optionBody: { flex: 1, marginLeft: 12 },
  optionEn: { color: '#263F55', fontSize: 15, fontWeight: '700' },
  optionAr: {
    marginTop: 5,
    color: '#41596E',
    fontSize: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  feedback: {
    marginTop: 15,
    padding: 17,
    borderRadius: 17,
    borderWidth: 1,
  },
  feedbackCorrect: { backgroundColor: '#E8F7EF', borderColor: '#A7D9BD' },
  feedbackWrong: { backgroundColor: '#FCECEC', borderColor: '#E3B0B0' },
  feedbackHeading: { fontSize: 18, fontWeight: '900', color: '#17324D' },
  feedbackHeadingAr: {
    fontSize: 18,
    fontWeight: '800',
    color: '#17324D',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  explanation: { marginTop: 12, color: '#40576B', lineHeight: 22 },
  explanationAr: {
    marginTop: 7,
    color: '#40576B',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  reference: {
    marginTop: 12,
    color: '#123B64',
    fontWeight: '800',
  },
  navigation: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  primary: {
    marginTop: 22,
    minWidth: 220,
    padding: 15,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#123B64',
  },
  primarySmall: {
    flex: 1,
    padding: 13,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#123B64',
  },
  primaryText: { color: '#FFFFFF', fontWeight: '900' },
  primaryArabic: {
    marginTop: 3,
    color: '#FFFFFF',
    fontWeight: '800',
    writingDirection: 'rtl',
  },
  secondary: {
    flex: 1,
    padding: 13,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#AFC5D8',
    backgroundColor: '#FFFFFF',
  },
  disabled: { opacity: 0.45 },
  resultTitle: { fontSize: 29, fontWeight: '900', color: '#17324D' },
  resultArabic: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: '800',
    color: '#17324D',
    writingDirection: 'rtl',
  },
  resultCircle: {
    width: 170,
    height: 170,
    marginTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 85,
    borderWidth: 7,
    borderColor: '#123B64',
    backgroundColor: '#E3F0FA',
  },
  resultScore: { fontSize: 38, fontWeight: '900', color: '#123B64' },
  resultPercentage: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: '800',
    color: '#526779',
  },
  resultText: {
    marginTop: 22,
    fontSize: 17,
    color: '#40576B',
    textAlign: 'center',
  },
  resultTextArabic: {
    marginTop: 6,
    fontSize: 18,
    color: '#40576B',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
