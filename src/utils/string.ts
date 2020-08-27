import {range} from './array';

export function makeID(length = 6): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const result = range(1, length)
    .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
    .join('');
  return result;
}
