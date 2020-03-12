/**
 * @description 函数防抖
 * @param {function} fn
 * @param {number} [wait=200]
 */
function debounce(fn, wait = 200) {
  // 初始化定时器
  // 定时器要放在闭包函数外，因为初始化该函数的时候要保留这个定时器
  let timer;

  // 返回闭包函数
  // 闭包函数始终能访问父函数作用域的变量，即 timer
  return function() {
    // 闭包函数执行的时候判断定时器是否处在，如果在保护期内则重新设置定时器
    if (timer) clearTimeout(timer);

    // 注意 fn.apply 传参
    // 若闭包函数是箭头函数就没有 arguments 变量，甚至可不用 this
    // 若定时器回调不是箭头函数，则需要在回调外额外保存参数传给防抖函数
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

function debounce(fn, wait = 200) {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

/**
 * @description 函数节流
 * @param {function} fn
 * @param {number} [wait=200]
 */
function throttle(fn, wait = 200) {}
