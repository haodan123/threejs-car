// 天空和地面管理类
import * as THREE from 'three'
import mitter from '@/utils/mitt'
export default class Sky {
  constructor(scene) {
    this.scene = scene//场景
    this.noMesh = []//当前背景的物体对象列表
    this.init()
  }
  // 初始化天空
  init() {
    // 默认先创建室内环境
    this.createInDoor()

    // evemtBus修改天空 切换场景
    mitter.on('changeSky', (item) => {
      this.clear()//清除当前的天空 防止数据太多
      if (item.name == '展厅') {
        this.createInDoor()
      } else if (item.name == '户外') {
        this.createOutDoor()
      }
    })
  }
  // 创建室内环境
  createInDoor() {
    const loader = new THREE.TextureLoader()
    loader.setPath('image/')
    // 球体
    const geometry = new THREE.SphereGeometry(10, 32, 16);

    const material = new THREE.MeshBasicMaterial({ color: 0x42454c, side: THREE.DoubleSide });//双面渲染灰色天空
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);//添加到场景
    this.noMesh.push(sphere)//存储到数组中
    // 创建一个圆形的平面地板
    const cirGeometry = new THREE.CircleGeometry(10, 32);
    // 标准材质 方便加地面阴影
    // 地板纹理
    const circleTexture = loader.load('insand.jpg')
    // 颜色加深
    circleTexture.colorSpace = THREE.SRGBColorSpace
    // 环境纹理贴图
    const roughnessTexture = loader.load('insand.png')
    roughnessTexture.colorSpace = THREE.SRGBColorSpace
    const cirMaterial = new THREE.MeshStandardMaterial({
      color: 0x42454c,
      map: circleTexture,
      roughness: 0.5 // 粗糙度设置（0 光滑， 1 粗糙）
      , roughnessMap: roughnessTexture,//粗糙度贴图
      metalness: 1, // 金属度（光反射的光泽程度，1 是最高）
      metalnessMap: roughnessTexture, // 金属度贴图
    });
    const circle = new THREE.Mesh(cirGeometry, cirMaterial);
    // console.log(circle);


    circle.receiveShadow = true//设置 平面阴影 可以反光
    // circle.rotation.set(- Math.PI / 2, 0, 0)
    circle.rotation.x = (- Math.PI / 2)  //x方向旋转90度  math.pi等于180度

    this.scene.add(circle);
    this.noMesh.push(circle)//存储到数组中

  }

  // 创建户外的环境
  createOutDoor() {
    const loader = new THREE.TextureLoader()
    loader.setPath('image/')
    // 球体
    const geometry = new THREE.SphereGeometry(40, 32, 16);
    // 天空纹理
    const sphereTexture = loader.load('desert.jpg')
    // 颜色加深
    sphereTexture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.MeshBasicMaterial({ map: sphereTexture, side: THREE.DoubleSide });//双面渲染灰色天空
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);//添加到场景
    this.noMesh.push(sphere)//存储到数组中
    // 创建一个圆形的平面地板
    const cirGeometry = new THREE.CircleGeometry(20, 32);
    // 标准材质 方便加地面阴影
    // 地板纹理
    const circleTexture = loader.load('sand.jpg')
    // 颜色加深
    circleTexture.colorSpace = THREE.SRGBColorSpace
    const cirMaterial = new THREE.MeshStandardMaterial({ map: circleTexture, color: 0xa0825a });
    const circle = new THREE.Mesh(cirGeometry, cirMaterial);
    // console.log(circle);
    circle.receiveShadow = true//设置 平面阴影 可以反光
    // circle.rotation.set(- Math.PI / 2, 0, 0)
    circle.rotation.x = (- Math.PI / 2)  //x方向旋转90度  math.pi等于180度

    this.scene.add(circle);
    this.noMesh.push(circle)//存储到数组中
  }

  // 清除球体和地面
  clear() {
    this.noMesh.forEach(item => {
      item.geometry.dispose()//销毁立方体
      item.material.dispose()//销毁材质
      item.material.map && item.material.map.dispose() //如果有纹理 销毁纹理
      this.scene.remove(item) //直接从场景销毁
      // item.parent.remove(item) //.parent销毁 跟上面一样
    })
    this.noMesh.splice(0, this.noMesh.length)//清空数组
  }

}
