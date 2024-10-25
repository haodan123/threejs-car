/**
 * 灯光类
 */
import emitter from '@/utils/mitt'
import * as THREE from 'three'

export class MyLight {
  constructor(scene) {
    this.scene = scene //场景
    this.nowSpotLight = {}//聚光灯源对象
    this.dcLightArr = []//平行光灯源数组
    //4个灯光的位置
    this.dirPosList = [
      [0, 5, 10],
      [-10, 5, 0],
      [0, 5, -10],
      [10, 5, 0]
    ]

    this.createCarDL()
    this.createSportL()

    emitter.on('changeSky', item => {
      if (item.name === '展厅') {
        // 打开聚光灯
        this.createSportL()
        this.dcLightArr.forEach(dclight => {
          // dclight.intensity = 0.5//平行光灯光亮度调到0.5
          dclight.intensity = 1//平行光灯光亮度调到0.5
        })
      } else if (item.name == '户外') {
        // 删除聚光灯
        this.removeSportl()
        this.dcLightArr.forEach(dclight => {
          dclight.intensity = 2//平行光灯光亮度调到2
        })
      }
    })


  }

  // 创建平行光
  createCarDL() {

    this.dirPosList.forEach(item => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(...item)
      directionalLight.castShadow = true

      // 把灯光加入到场景中
      this.scene.add(directionalLight);
      this.dcLightArr.push(directionalLight)//把平行光存到数组中方便调用
      const helper = new THREE.DirectionalLightHelper(directionalLight, 3);
      // 吧辅助灯加入到场景
      this.scene.add(helper);
    })
  }

  // 创建聚光灯
  createSportL() {
    this.nowSpotLight = new THREE.SpotLight(0xffffff, 100);
    // 设置聚光灯光源角度（0 - Math.PI / 2）
    this.nowSpotLight.angle = 0.16 * Math.PI
    // 光的衰减程度（0 - 1）
    this.nowSpotLight.penumbra = 0.8
    // 开启阴影支持
    this.nowSpotLight.castShadow = true

    this.nowSpotLight.shadow.mapSize.set(4096, 4096) // 阴影贴图大小宽高
    this.nowSpotLight.position.set(0, 5, 0)

    this.scene.add(this.nowSpotLight);

    const spotLightHelper = new THREE.SpotLightHelper(this.nowSpotLight);
    this.scene.add(spotLightHelper);
  }
  // 删除聚光灯
  removeSportl() {
    this.scene.remove(this.nowSpotLight)
    this.nowSpotLight = {}
  }
}
