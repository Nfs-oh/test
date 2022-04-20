import { subscribe } from '@/utils/subscribe';

export const add = (a, b) => {
  return a + b;
}

export const sub = (a, b) => {
  return subscribe(a - b);
}
