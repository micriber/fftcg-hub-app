type GenericObject = {[key: string]: any};

export function deepEqual<T extends GenericObject, U extends GenericObject>(
  object1: T,
  object2: U,
) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export function isObject(object: any) {
  return object != null && typeof object === 'object';
}
