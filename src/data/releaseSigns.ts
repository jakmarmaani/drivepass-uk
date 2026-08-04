import signsData from './traffic-signs.json';
import type { TrafficSign } from '@/types/content';

export const releaseSigns =
  signsData as TrafficSign[];
