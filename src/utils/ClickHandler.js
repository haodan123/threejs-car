// 整个threejs项目 单机事件管理类
import * as THREE from 'three'
// import emitter from './mitt'

export class ClickHandler {
  // 单例模式（静态/类方法）: 这个类被调用 n 次也只会产生同一个实例对象
  // 类方法只能由类调用，例如：ClickHandler.getInstance()
  static getInstance() {
    if (!this.instance) {
      // 只有运行时：第一次才会进入
      this.instance = new ClickHandler()//实例化对象
    }
    return this.instance
  }
  // init只要在index.vue调用一次就好  不要调用多次
  init(camera, dom) {
    this.camera = camera //相机
    this.dom = dom//渲染的dom

    this.list = []//光线投射交互计算的物体
    this.map = new Map() //key可以是three.js的物体 (与点击要执行的回调函数产生一对一关系)

    // 光线投射
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    window.addEventListener('click', (e) => {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      pointer.x = (e.clientX / dom.clientWidth) * 2 - 1;
      pointer.y = - (e.clientY / dom.clientHeight) * 2 + 1;

      // 通过摄像机和鼠标位置更新射线
      raycaster.setFromCamera(pointer, this.camera);
      // 计算物体和射线的焦点
      const list2 = raycaster.intersectObjects(this.list);
      // console.log(list2);
      // console.log(this.list);
      // 通过交互物体本身，去 map 中找到对应要执行的回调函数调用
      // obj 是射线收集到的数据对象，obj.object 才是 three.js 物体对象
      list2.forEach(obj => {
        // console.log(obj);
        const fn = this.map.get(obj.object)
        // emitter.emit('openDoor', obj.object)
        // 调用这个函数 并吧three物体传回去
        fn(obj.object)
      })

    })

  }
  // 传入要点击物体和函数体
  addMesh(mesh, fn) {
    this.list.push(mesh)
    this.map.set(mesh, fn)//mesh是key 是threejs的物体  fn是value 是函数

    // console.log(this.map.get(mesh));
  }
}
