/**
 * @description 变量数据类型检测
 * @returns {Boolean}
 */

// Base detector
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);

// Derived detector
export const isNumber = isType('Number');
export const isString = isType('String');
export const isBoolean = isType('Boolean');
export const isArray = isType('Array');
export const isObject = isType('Object');
export const isFunction = isType('Function');
export const isUndefined = isType('Undefined');
export const isNull = isType('Null');
