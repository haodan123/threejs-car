import { ref, onMounted, watch, nextTick } from 'vue'
import Stats from 'three/examples/jsm/libs/stats.module.js' //  单独引入 stats 组件 性能监视器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js' //轨道控制器
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';


import * as THREE from 'three'
/**
 *初始化threejs
 * @param {*} dom 渲染到哪个dom下
 * @returns  把场景摄像机 渲染器等必要的东西返回出去
 */
export const useThreeInit = (dom) => {


  // 创建 场景 摄像机 渲染器
  let scene, camera, renderer
  // 轨道控制器
  let controls
  // 性能监视器
  let stats
  // 把css渲染到threejs中
  let css3dRenderer
  // 渲染2d属性
  let css2dRenderer
  // console.log('dom', dom, scene, camera, renderer, controls, css3dRenderer);
  let width, height
  if (dom) {
    width = dom.clientWidth
    height = dom.clientHeight
  } else {
    width = window.innerWidth
    height = window.innerHeight
  }


  // 初始化场景摄像机渲染器
  const init = () => {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    // camera.position.z = 0.1 //z轴正0.1 做全景效果
    camera.position.z = 5 //z轴正5 做正常效果
    renderer = new THREE.WebGLRenderer({ antialias: true }) //设置antialias为true就没有锯齿了
    renderer.setSize(width, height)
    // testBox.value.appendChild(renderer.domElement)
    // 渲染到body上
    if (dom) {
      dom.appendChild(renderer.domElement)
    } else {
      document.body.appendChild(renderer.domElement)
    }
  }
  // 轨道控制器
  const createControls = () => {
    controls = new OrbitControls(camera, renderer.domElement)
    // 摄像机移动范围控制
    // controls.maxDistance = 10 //最多放大到10个单位
    // controls.minDistance = 2 //最小缩小到2个单位
  }

  // 坐标轴
  const createHelper = () => {
    const axesHelper = new THREE.AxesHelper(5)
    // console.log(axesHelper)
    scene.add(axesHelper)
  }
  // 创建性能监视器
  const createStats = () => {
    // 记得在循环渲染中调用 stats.update()
    stats = new Stats()
    stats.setMode(0) //0先显示fps 1先显示ms 2先显示mb
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0'
    stats.domElement.style.top = '0'
    // 渲染到body上
    if (dom) {
      dom.appendChild(stats.domElement)
    } else {
      document.body.appendChild(stats.domElement)
    }
  }
  // 渲染3dcss的文字 记得在renderLoop中调用  不然不显示
  const create3dRenderer = () => {
    css3dRenderer = new CSS3DRenderer()
    css3dRenderer.setSize(width, height)
    css3dRenderer.domElement.style.position = 'absolute'
    css3dRenderer.domElement.style.left = '0'
    css3dRenderer.domElement.style.top = '0'
    css3dRenderer.domElement.style.pointerEvents = 'none'
    // document.body.appendChild(css3dRenderer.domElement)
    if (dom) {
      dom.appendChild(css3dRenderer.domElement)
    } else {
      document.body.appendChild(css3dRenderer.domElement)
    }
  }

  // 渲染2dcss的文字  记得在renderLoop中调用  不然不显示
  const create2dRenderer = () => {
    css2dRenderer = new CSS2DRenderer()
    css2dRenderer.setSize(width, height)
    css2dRenderer.domElement.style.position = 'fixed'
    css2dRenderer.domElement.style.left = '0'
    css2dRenderer.domElement.style.top = '0'
    css2dRenderer.domElement.style.pointerEvents = 'none'
    // document.body.appendChild(css2dRenderer.domElement)
    if (dom) {
      dom.appendChild(css2dRenderer.domElement)
    } else {
      document.body.appendChild(css2dRenderer.domElement)
    }
  }


  // 循环渲染
  const renderLoop = () => {
    requestAnimationFrame(renderLoop)
    controls?.update() //更新轨道控制器
    stats?.update() //更新监视器

    // 也要让 DOM 渲染器不断更新不同角度的最新画面
    css3dRenderer.render(scene, camera)
    css2dRenderer.render(scene, camera)


    renderer.render(scene, camera)
  }

  // onMounted(() => {
  // console.log('hook');
  // 初始化
  init()
  // 轨道控制器
  createControls()
  // css3d渲染
  create3dRenderer()
  // css2d渲染
  create2dRenderer()
  // 创建坐标轴
  createHelper()

  // 创建性能监视器
  createStats()
  // 循环渲染
  renderLoop()
  // 监听浏览器宽高
  // resizeRender()
  // })

  return { scene, camera, renderer, controls, css3dRenderer, css2dRenderer };
  // return scene

}
