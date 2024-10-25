// 汽车类
import * as THREE from 'three'
import { MySprite } from './MySprite'
import { ClickHandler } from '@/utils/ClickHandler'
import gsap from 'gsap'
import emitter from '@/utils/mitt'

export class Car {
  constructor(model, scene, camera, controls, dom) {
    this.model = model  //汽车的模型
    this.scene = scene //场景
    this.camera = camera  //摄像机
    this.controls = controls //轨道控制器
    this.dom = dom//渲染的dom  用来做点击事件的时候用



    // Object_103 车身的name  用来修改颜色
    // Object_64  左车门
    // Object_77 右车门
    // Object_111  车的棚顶
    this.carModel = {
      'body': {
        'main': {//车身
          name: 'Object_103',
          model: {}//小物体对象
        },
        'roof': {//车棚顶
          name: 'Object_110',
          model: {}//小物体对象
        },
        'roof1': {//车棚边框
          // name: 'Object_111',
          name: 'Object_111',
          model: {}//小物体对象
        },
        'leftDoor': {//左车门
          name: 'Object_64',
          model: {},//小物体对象
          mark: [//精灵图的标点
            {
              name: 'sprite',
              url: 'image/sprite.png',
              position: [1.07, 1.94, -0.23], // 参考车门的原点相对位移
              scale: [0.2, 0.2]
            }
          ]
        },
        'rightDoor': {//右车门
          name: 'Object_77',
          model: {},//小物体对象
          mark: [//精灵图的标点
            {
              name: 'sprite',
              url: 'image/sprite.png',
              position: [-1.05, 0.78, -0.23],
              scale: [0.2, 0.2]
            }
          ]
        }
      },
      'glass': { // 玻璃
        'front': { // 前玻璃
          name: 'Object_90',
          model: {}
        },
        'leftGlass': { // 左玻璃
          name: 'Object_68',
          model: {}
        },
        'rightGlass': { // 右玻璃
          name: 'Object_81',
          model: {}
        }
      }
    }

    this.init()
    this.modifyCarDefault()
    this.createDoorSprite()
  }
  init() {
    // 把模型加载到场景中
    this.scene.add(this.model)

    // 遍历汽车的每一个小物体 每个小物体产生阴影
    this.model.traverse(obj => {
      obj.castShadow = true
    })

    // 通过数据结构名称 => 小物体对象保存在数据结构中  车身
    Object.values(this.carModel.body).forEach(obj => {
      // obj ==={  name: 'Object_77',model: {}//小物体对象 }
      // getObjectByName是模型中 找小物件name的方法
      // 找到name对应的小物体模型
      const target = this.model.getObjectByName(obj.name)
      // 把找到的模型存储回对象中  这样上面的空括号就会有模型了
      obj.model = target
      // console.log(target);
    })
    // 通过数据结构名称 => 小物体对象保存在数据结构中 车窗玻璃
    Object.values(this.carModel.glass).forEach(obj => {
      const target = this.model.getObjectByName(obj.name)
      // 把找到的模型存储回对象中  这样上面的空括号就会有模型了
      obj.model = target
    })


    // 用evevtBus修改车身颜色
    emitter.on('changeCarColor', (obj) => {
      // 循环车的车身改变车身颜色
      Object.values(this.carModel.body).forEach(item => {
        //用three自带的颜色渲染器 渲染颜色 否则不生效
        item.model.material.color = new THREE.Color(obj.color)
      })
    })

    // 用eventBus修改车的贴膜
    emitter.on('changeCarCoat', obj => {
      // 循环车身改变贴膜
      Object.values(this.carModel.body).forEach(item => {
        // 修改车的材质属性
        if (obj.name == '高光') {
          item.model.material.roughness = 0.5,// 粗糙度
            item.model.material.metalness = 1// 金属度
          item.model.material.clearcoat = 1// 清晰度

        } else if (obj.name == '磨砂') {
          item.model.material.roughness = 1// 粗糙度
          item.model.material.metalness = 0.5// 金属度
          item.model.material.clearcoat = 0// 清晰度
        }
      })
    })
    // 修改视角
    emitter.on('changeLook', obj => {
      this.setCameraAnimation(obj)
    })
  }

  // 修改车身默认细节
  modifyCarDefault() {
    // 物理材质 让汽车看起来更真实
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      // color: 0xff9900,//颜色
      color: 'red',//颜色
      roughness: 0.5,// 粗糙度
      metalness: 1,// 金属度
      clearcoat: 1,//清晰度
      clearcoatRoughness: 0,//清晰度的粗糙度
    })
    Object.values(this.carModel.body).forEach(obj => {
      // 给车身的模型修改材质
      obj.model.material = bodyMaterial
    })
    // 给车的玻璃弄成单面渲染 里面可以看到外面
    Object.values(this.carModel.glass).forEach(obj => {
      // console.log(obj);
      obj.model.material.side = THREE.FrontSide // 前面渲染
    })
    // 车顶两面渲染
    this.carModel.body.roof.model.material.side = THREE.DoubleSide
  }

  // 在车门上添加精灵物体
  createDoorSprite() {
    const markList = [
      this.carModel.body.leftDoor, this.carModel.body.rightDoor
    ]
    markList.forEach(item => {
      // console.log(item);
      item.mark.forEach(obj => {
        if (obj.name === 'sprite') {
          const { name, url, scale, position } = obj
          // console.log(obj);
          // 把对应的名称 路径 位置 大小 传给类里面
          const sprite = new MySprite({ name, url, position, scale })
          // 把新生成的精灵图添加到车门的模型上
          item.model.add(sprite)
          // 给精灵物体添加点击事件
          ClickHandler.getInstance().addMesh(sprite, (clickThreeObj) => {
            // console.log('点击触发',clickThreeObj);
            // clickThreeObj: 精灵物体
            // clickThreeObj.parent: Object_77 车门物体 （坐标轴原点在世界坐标系中心，旋转车门有问题）
            // clickThreeObj.parent.parent.parent （才是整个车门的最大物体对象，坐标系在车门框点固定住-旋转）
            // 去https://threejs.org/editor/把模型拖进去 慢慢调试 得出结果
            const targetDoor = clickThreeObj.parent.parent.parent
            if (!targetDoor.userData.isOpen) {
              // 没开门的状态
              // targetDoor.rotation.x = Math.PI / 3
              // 用gsap动画开门
              this.setDoorAnimation(targetDoor, {
                x: Math.PI / 3
              })
              targetDoor.userData.isOpen = true  //开门
            } else {
              // 开门的状态
              // targetDoor.rotation.x = 0
              // 用gsap动画关门
              this.setDoorAnimation(targetDoor, { x: 0 })

              targetDoor.userData.isOpen = false //关门
            }
          })

        }
      })
    });

  }

  // gsap动画
  setDoorAnimation(mesh, obj) {
    gsap.to(mesh.rotation, {
      x: obj.x,//移动方向
      duration: 1,//1秒钟完成动画
      ease: 'power1.in',//移动的类型
    })
  }

  // 摄像机和轨道控制器动画
  setCameraAnimation(dataObj) {
    gsap.to(this.camera.position, {
      ...dataObj.camera,
      duration: 1,
      ease: 'power1.in'
    })
    gsap.to(this.controls.target, {
      ...dataObj.controls,
      duration: 1,
      ease: 'power1.in'
    })
  }
}
