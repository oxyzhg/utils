const MAX_SAFE_INTEGER = 9007199254740991;
const MAX_ARRAY_LENGTH = 4294967295;

const numberTag = '[object Number]';
const stringTag = '[object String]';
const boolTag = '[object Boolean]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const funcTag = '[object Function]';
const argsTag = '[object Arguments]';
const dateTag = '[object Date]';
const regexpTag = '[object RegExp]';
const errorTag = '[object Error]';
const symbolTag = '[object Symbol]';
const setTag = '[object Set]';
const mapTag = '[object Map]';
const weakSetTag = '[object WeakSet]';
const weakMapTag = '[object WeakMap]';
const promiseTag = '[object Promise]';
const genTag = '[object GeneratorFunction]';

const getType = target => Object.prototype.toString.call(target);

function isNumber(value) {
  return typeof value == 'number' || getType(value) === numberTag;
}

function isString(value) {
  return typeof value == 'string' || getType(value) === stringTag;
}

function isBoolean(value) {
  return typeof value == 'boolean' || getType(value) === boolTag;
}

function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isArray(value) {
  return Array.isArray(value);
}

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

function isObject(value) {
  return value != null && (typeof value == 'object' || typeof value == 'function');
}

function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

function isFunction(value) {
  return getType(value) == funcTag || getType(value) == genTag;
}

function isArguments(value) {
  return (
    isArrayLikeObject(value) &&
    Object.prototype.hasOwnProperty.call(value, 'callee') &&
    (Object.prototype.propertyIsEnumerable.call(value, 'callee') || getType(value) == argsTag)
  );
}

function isSymbol(value) {
  return typeof value == 'symbol' || getType(value) === symbolTag;
}

function isSet(value) {}
function isMap(value) {}
function isWeakSet(value) {}
function isWeakMap(value) {}

function isLength(value) {
  return typeof value == 'number' && value >= 0 && value % 1 == 0 && value < MAX_ARRAY_LENGTH;
}

function isEmpty(value) {
  if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value))) {
    return !value.length;
  }
  const tag = getType(value);
  if (tag == setTag || tag == mapTag) {
    return !value.size;
  }
  // isPrototype
  for (let key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) return false;
  }
  return true;
}
