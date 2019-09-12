const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);

const isNumber = isType('Number');
const isString = isType('String');
const isBoolean = isType('Boolean');
const isArray = isType('Array');
const isObject = isType('Object');
const isFunction = isType('Function');
const isUndefined = isType('Undefined');
const isNull = isType('Null');
