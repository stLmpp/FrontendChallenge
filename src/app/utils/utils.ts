export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isObject(value: any): value is Record<any, any> {
  return typeof value === 'object';
}
