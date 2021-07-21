import { filter, OperatorFunction } from 'rxjs';
import { isNotNil } from '../utils';

export function filterNil<T>(): OperatorFunction<T, NonNullable<T>> {
  return filter(isNotNil);
}
