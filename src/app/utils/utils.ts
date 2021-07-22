export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isObject(value: any): value is Record<any, any> {
  return typeof value === 'object';
}

export function isNil(value: any): value is null | undefined {
  return value == null;
}

export function isNotNil<T>(value: T): value is NonNullable<T> {
  return !isNil(value);
}

export function resolveUpdate<T>(partial: Partial<T> | ((item: T) => T)): (item: T) => T {
  return isFunction(partial) ? partial : (item: T) => ({ ...item, ...partial });
}
