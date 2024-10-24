/**
 * 灯光类
 */
import * as THREE from 'three'

export class MyLight {
  constructor(scene) {
    this.scene = scene //场景
    //4个灯光的位置
    this.dirPosList = [[0, 5, 10],
    [-10, 5, 0],
    [0, 5, -10],
    [10, 5, 0]]

    this.createCarDL()
  }

  // 创建平行光
  createCarDL() {

    this.dirPosList.forEach(item => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(...item)
      // 把灯光加入到场景中
      this.scene.add(directionalLight);
      const helper = new THREE.DirectionalLightHelper(directionalLight, 3);
      // 吧辅助灯加入到场景
      this.scene.add(helper);
    })


  }
}
