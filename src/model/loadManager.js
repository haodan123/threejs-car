import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' //模型加载器

/**
 *专门加载模型文件的
 * @param {*} path 模型文件的路径
 * @param {*} successFn  接受模型对象的成功函数
 */
export const loadManager = (path, successFn) => {
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(path, (gltf) => successFn(gltf.scene), (process) => {
    //模型加载的经度
  }, (error) => {
    // 报错
    throw new Error(error)
  })

}

