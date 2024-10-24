// 天空和地面管理类
import * as THREE from 'three'

export class Sky {
  constructor(scene) {
    this.scene = scene//场景
    this.noMesh = []//当前背景的物体对象列表
    this.init()
  }
  // 初始化天空
  init() {
    // 默认先创建室内环境
    this.createInDoor()
  }
  // 创建室内环境
  createInDoor() {
    // 球体
    const geometry = new THREE.SphereGeometry(10, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x42454c, side: THREE.DoubleSide });//双面渲染灰色天空
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);//添加到场景
    this.noMesh.push(sphere)//存储到数组中
    // 创建一个圆形的平面地板
    const cirGeometry = new THREE.CircleGeometry(10, 32);
    // 标准材质 方便加地面阴影
    const cirMaterial = new THREE.MeshStandardMaterial({ color: 0x42454c });
    const circle = new THREE.Mesh(cirGeometry, cirMaterial);
    // console.log(circle);
    circle.receiveShadow = true//设置 平面阴影 可以反光
    // circle.rotation.set(- Math.PI / 2, 0, 0)
    circle.rotation.x = (- Math.PI / 2)  //x方向旋转90度  math.pi等于180度

    this.scene.add(circle);
    this.noMesh.push(circle)//存储到数组中

  }

}
