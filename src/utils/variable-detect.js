const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isObject = isType('Object');

function looseEqual(a, b) {
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  }
  return false;
}

function arrayEquals(a = [], b = []) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!this.looseEqual(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return this.arrayEquals(value1, value2);
  }
  return this.looseEqual(value1, value2);
}

function isEmpty(val) {
  if (val == null) return true;
  if (typeof val === 'boolean') return false;
  if (typeof val === 'number') return !val;
  if (val instanceof Error) return val.message === '';
  switch (Object.prototype.toString.call(val)) {
    case '[object String]':
    case '[object Array]':
      return !val.length;
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }
  return false;
}
