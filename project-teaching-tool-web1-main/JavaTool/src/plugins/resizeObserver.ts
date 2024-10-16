//对于对象的引用是弱引用，这意味着在没有其他引用存在时垃圾回收能正确进行。在取消引用时，不需要手动删除元素，因为它们会自动被垃圾回收。
const map = new WeakMap();
 
// ResizeObserver是一个构造函数，用于监听元素的变化，当元素的尺寸发生变化时，会触发回调函数。
const divs = new ResizeObserver((entries) => {
  // entries是一个数组，包含所有被观察的元素的信息
  for (const entry of entries) {
    // 将元素和回调函数取出
    const handler = map.get(entry.target);
    // 如果回调函数存在，则调用回调函数
    if (handler) {
      handler({
        width: entry.borderBoxSize[0].inlineSize, //元素的宽度
        height: entry.borderBoxSize[0].blockSize, //元素的高度
      });
    }
  }
});
 
//获取使用指令的div的宽高.e.width和e.height
export const vResize = {
  mounted(el: Element, binding: any) {
    // 将元素和回调函数存入map中
    map.set(el, binding.value);
    // 开始观察元素
    divs.observe(el);
  },
  unmounted(el: Element) {
    // 停止观察元素
    divs.unobserve(el);
  },
};