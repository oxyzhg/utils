function isNumber(value) {
  return (
    typeof value == 'number' ||
    Object.prototype.toString.call(value).slice(8, -1) == 'Number'
  );
}

function isString(value) {
  return (
    typeof value == 'string' ||
    Object.prototype.toString.call(value).slice(8, -1) == 'String'
  );
}

function isBoolean(value) {
  return (
    typeof value == 'boolean' ||
    Object.prototype.toString.call(value).slice(8, -1) == 'Boolean'
  );
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
  return value != null && isLength(value.length) && isFunction(value);
}

function isObject(value) {
  return (
    value != null && (typeof value == 'object' || typeof value == 'function')
  );
}

function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

function isFunction(value) {
  return Object.prototype.toString.call(value).slice(8, -1) == 'Function';
}

function isRegExp(value) {}
function isDate(value) {}
function isBuffer(value) {}
function isSymbol(value) {}
function isSet(value) {}
function isMap(value) {}

function isLength(value) {
  return (
    typeof value == 'number' &&
    value > -1 &&
    value % 1 == 0 &&
    value < 9007199254740991
  );
}
