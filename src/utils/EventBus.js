// eventbus源码
// 集中式事件总线类（订阅与发布的自定义事件）
export class EventBus {
  constructor() {
    this.eventObj = {} // 保存事件名和要触发的函数体们
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus()
    }
    return this.instance
  }
  // 订阅事件
  on(eventName, fn) {
    if (!this.eventObj[eventName]) {
      // 如果这个事件名字没有注册过，那就先声明此属性（事件名），赋予一个装入回调函数的数组
      this.eventObj[eventName] = []
    }
    this.eventObj[eventName].push(fn)
  }
  // 触发事件并传参
  emit(eventName, ...arg) {
    // arg 此变量是一个数组（值就是按照先后顺序传入的实参）
    this.eventObj[eventName].forEach(fn => {
      fn(...arg) // 展开参数数组，按顺序一个个传递给回调函数
    })
  }
}
