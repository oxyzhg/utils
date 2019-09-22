function clone(value) {}

function cloneDeep(value) {}

function debounce(func, delay) {}

function throttle(func, delay) {}

/**
 * @description 函数柯里化
 * @param {Function} func [被柯里化函数]
 * @param {Number} arity [传参数量]
 * @returns
 */
function curry(func, arity) {
  const length = arity || func.length;
  return (...args) => {
    if (args.length < length) {
      return curry((..._args) => func(...args, ..._args));
    }
    return func(...args);
  };
}
