export function get(obj: any, path: string|string[], defValue?: any): any {
  if (!path) {
    return undefined;
  }

  const pathArray: string[] = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result: any = pathArray.reduce(
    (prevObj: string, key: string) => prevObj && prevObj[key],
    obj
  );

  return result === undefined ? defValue : result;
}

export function isObject(a: any): boolean {
  return a instanceof Object;
}

export function has(obj: any, path: string|string[]): boolean {
  const pathArray: string[] = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  return !!pathArray.reduce((prevObj: string, key: string) => prevObj && prevObj[key], obj);
}
