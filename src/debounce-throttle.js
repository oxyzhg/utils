/**
 * @description 函数防抖
 * @param {function} fn
 * @param {number} [delay=300]
 */
export const debounce = (fn, delay = 300) => {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

/**
 * @description 函数节流
 * @param {function} fn
 * @param {number} [delay=300]
 */
export const throttle = (fn, delay = 300) => {
  let timer;

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, delay);
    }
  };
};
