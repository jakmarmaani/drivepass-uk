import * as Speech from 'expo-speech';

export async function stopSpeech(): Promise<void> {
  await Speech.stop();
}

export function speakEnglish(text: string): void {
  Speech.stop();
  Speech.speak(text, {
    language: 'en-GB',
    rate: 0.88,
    pitch: 1,
  });
}

export function speakArabic(text: string): void {
  Speech.stop();
  Speech.speak(text, {
    language: 'ar',
    rate: 0.82,
    pitch: 1,
  });
}
