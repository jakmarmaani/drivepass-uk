import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { initialiseDatabase } from '@/database/database';

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initialiseDatabase()
      .then(() => setReady(true))
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Database error'));
  }, []);

  if (error) return <View style={styles.center}><Text style={styles.error}>Database error</Text><Text>{error}</Text></View>;
  if (!ready) return <View style={styles.center}><ActivityIndicator size="large" color="#123B64" /><Text style={styles.loading}>Preparing DrivePass UK...</Text></View>;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#123B64' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#F4F7FA' }
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="practice/index" options={{ title: 'Practice | التدريب' }} />
        <Stack.Screen name="practice/all" options={{ title: 'All Questions | جميع الأسئلة' }} />
        <Stack.Screen name="practice/[category]" options={{ title: 'Category Practice | تدريب حسب الفئة' }} />
        <Stack.Screen name="mock-test/index" options={{ title: 'Mock Test | اختبار تجريبي' }} />
        <Stack.Screen name="signs/index" options={{ title: 'Traffic Signs | إشارات المرور' }} />
        <Stack.Screen name="progress/index" options={{ title: 'Progress | التقدم' }} />
        <Stack.Screen name="bookmarks/index" options={{ title: 'Bookmarks | المحفوظات' }} />
        <Stack.Screen name="settings/index" options={{ title: 'Settings | الإعدادات' }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F4F7FA' },
  loading: { marginTop: 14, color: '#17324D', fontWeight: '700' },
  error: { color: '#B42318', fontSize: 24, fontWeight: '900', marginBottom: 12 }
});
