import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const cards = [
  { icon: '✓', en: 'Practice Questions', ar: 'الأسئلة التدريبية', route: '/practice' as const },
  { icon: '50', en: 'Mock Test', ar: 'اختبار تجريبي', route: '/mock-test' as const },
  { icon: '△', en: 'Traffic Signs', ar: 'إشارات المرور', route: '/signs' as const },
  { icon: '%', en: 'My Progress', ar: 'مستوى التقدم', route: '/progress' as const },
  { icon: '★', en: 'Bookmarks', ar: 'الأسئلة المحفوظة', route: '/bookmarks' as const },
  { icon: '⚙', en: 'Settings', ar: 'الإعدادات', route: '/settings' as const },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.title}>DrivePass UK</Text>
          <Text style={styles.titleAr}>درايف باس المملكة المتحدة</Text>
          <Text style={styles.subtitle}>Learn. Practise. Pass.</Text>
          <Text style={styles.subtitleAr}>تعلّم. تدرّب. انجح.</Text>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Independent revision app</Text>
          <Text style={styles.noticeAr}>تطبيق مستقل للمراجعة</Text>
          <Text style={styles.noticeText}>Original practice content based on UK driving rules. Not affiliated with or endorsed by DVSA.</Text>
          <Text style={styles.noticeTextAr}>محتوى تدريبي أصلي مبني على قواعد القيادة البريطانية، وغير تابع لوكالة DVSA.</Text>
        </View>

        {cards.map((card) => (
          <Pressable key={card.route} style={styles.card} onPress={() => router.push(card.route)}>
            <View style={styles.icon}><Text style={styles.iconText}>{card.icon}</Text></View>
            <View style={styles.body}>
              <Text style={styles.cardTitle}>{card.en}</Text>
              <Text style={styles.cardAr}>{card.ar}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#123B64' },
  container: { paddingBottom: 40, backgroundColor: '#F4F7FA' },
  hero: { backgroundColor: '#123B64', paddingHorizontal: 24, paddingTop: 56, paddingBottom: 34, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', textAlign: 'center' },
  titleAr: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', textAlign: 'center', writingDirection: 'rtl', marginTop: 7 },
  subtitle: { color: '#DCE8F3', textAlign: 'center', marginTop: 16 },
  subtitleAr: { color: '#DCE8F3', textAlign: 'center', writingDirection: 'rtl', marginTop: 4, fontSize: 16 },
  notice: { margin: 18, padding: 17, borderRadius: 16, backgroundColor: '#FFF5D6', borderWidth: 1, borderColor: '#E9D493' },
  noticeTitle: { color: '#6D5310', fontWeight: '900' },
  noticeAr: { color: '#6D5310', fontWeight: '800', textAlign: 'right', writingDirection: 'rtl' },
  noticeText: { color: '#604F23', marginTop: 9, lineHeight: 20 },
  noticeTextAr: { color: '#604F23', marginTop: 6, lineHeight: 24, textAlign: 'right', writingDirection: 'rtl' },
  card: { marginHorizontal: 18, marginBottom: 12, padding: 16, borderRadius: 18, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E8EF' },
  icon: { width: 52, height: 52, borderRadius: 15, backgroundColor: '#E3F0FA', alignItems: 'center', justifyContent: 'center' },
  iconText: { color: '#123B64', fontSize: 20, fontWeight: '900' },
  body: { flex: 1, marginHorizontal: 14 },
  cardTitle: { color: '#17324D', fontSize: 17, fontWeight: '900' },
  cardAr: { color: '#17324D', fontSize: 17, fontWeight: '800', textAlign: 'right', writingDirection: 'rtl', marginTop: 3 },
  arrow: { color: '#123B64', fontSize: 32 },
});
