const raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;
// const isArray = arg => arg instanceof Array && arg.constructor === Array;
const isFunction = arg => arg instanceof Function && arg.constructor === Function;

class TaskSlice {
  /**
   * @description
   * @param { number } sliceCount [切片次数]
   * @param { function } callback [回调函数]
   * @returns
   * @memberof TaskSlice
   */
  init(sliceCount, callback) {
    this.sliceCount = sliceCount;
    this.callback = callback;

    if (!isFunction(callback)) {
      // console.log(callback)
      console.error('callback is required & funcrion');
      return;
    }

    // 添加切片任务
    this.generator = this.queue();
    // 开始切片
    this.next();
  }

  next() {
    const { generator } = this;
    const start = performance.now();
    let res = null;
    do {
      res = generator.next();
    } while (!res.done && performance.now() - start < 16.7);
    if (res.done) return;
    raf(this.next.bind(this));
  }

  *queue() {
    const { sliceCount, callback } = this;
    // 处理次数
    for (let i = 0; i < sliceCount; i++) {
      const start = performance.now();
      callback(i);
      // 如果执行需要的时间少于 16.7ms 就停止继续执行下去
      // 如果大于的话，就在下次绘制的时候去执行
      while (performance.now() - start < 16.7) {
        yield;
      }
    }
  }
}

export default new TaskSlice();
