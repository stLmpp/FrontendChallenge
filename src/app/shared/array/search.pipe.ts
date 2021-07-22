import { Pipe, PipeTransform } from '@angular/core';

export function search<T extends Record<any, any>, K extends keyof T>(
  array: T[],
  key: K,
  term: T[K] | null | undefined
): T[] {
  const newTerm = (term?.toString?.() ?? term + '').toLowerCase().normalize('NFC');
  if (!newTerm) {
    return array;
  }
  return array.filter(item =>
    (item[key]?.toString?.() ?? item[key] + '').toLowerCase().normalize('NFC').includes(newTerm)
  );
}

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform<T extends Record<any, any> = any, K extends keyof T = keyof T>(
    array: T[] | undefined | null,
    key: K,
    term: T[K] | null | undefined
  ): T[] {
    if (!array?.length) {
      return [];
    }
    return search(array, key, term);
  }
}
