<template>
  <div class="wrap">
    <div ref="carRef" class="carRef"></div>
    <div class="tool">
      <div class="group_list">
        <div class="group">
          <p class="title">车漆颜色</p>
          <div class="item_wrap col_group">
            <div
              @click="changeCarColor(item)"
              :class="item.isSelected ? 'active' : ''"
              v-for="(item, index) in colorList"
              :key="index"
            >
              <div class="col" :style="{ backgroundColor: item.color }"></div>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
        <div class="group">
          <p class="title">贴膜切换</p>
          <div class="item_wrap coat_group">
            <div
              @click="changeCarCoat(item)"
              :class="item.isSelected ? 'active' : ''"
              v-for="(item, index) in coatList"
              :key="index"
            >
              <div></div>
              <p class="info_btn">{{ item.name }} ¥{{ item.price }}</p>
            </div>
          </div>
        </div>
        <div class="group">
          <p class="title">场景切换</p>
          <div class="item_wrap scene_group">
            <div
              @click="changeSky(item)"
              :class="item.isSelected ? 'active' : ''"
              v-for="(item, index) in sceneList"
              :key="index"
            >
              <div></div>
              <p class="info_btn">{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div class="group">
          <p class="title">视角切换</p>
          <div class="item_wrap look_group">
            <div
              @click="changeLook(item)"
              :class="item.isSelected ? 'active' : ''"
              v-for="(item, index) in lookList"
              :key="index"
            >
              <div></div>
              <p class="info_btn">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="price">
        <span>¥ {{ price }} </span>
        <div class="next_btn">下一步</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useThreeInit } from '@/composables/threesInit.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js' //辅助工具
import { colorList, coatList, sceneList, lookList } from '@/utils/dataList.js'

import { ClickHandler } from '@/utils/ClickHandler.js'
import emitter from '@/utils/mitt'

const carRef = ref()
let scene, camera, renderer, controls, css3dRenderer, css2dRenderer
onMounted(() => {
  const init = useThreeInit(carRef.value)
  scene = init.scene
  camera = init.camera
  renderer = init.renderer
  controls = init.controls
  css3dRenderer = init.css3dRenderer
  css2dRenderer = init.css2dRenderer
  renderer.shadowMap.enabled = true // 开启阴影渲染支持

  // three.js 光线投射统一管理类初始化  threejs的点击事件
  ClickHandler.getInstance().init(camera, carRef.value)
  resizeRender()
})
// 计算属性只能监控 ref的变化 不能监控普通数组的变化  所以吧dataList中所有的数据都改成ref数据
const price = computed(() => {
  let zprice = 2444700.0
  const findCoat = coatList.value.find(item => item.isSelected)
  zprice += findCoat.price
  return zprice.toFixed(2)
})

// 修改车的颜色
const changeCarColor = item => {
  // 调用eventBus
  colorList.value.forEach(obj => {
    // 把所有的选中都取消
    obj.isSelected = false
  })
  emitter.emit('changeCarColor', item)
  item.isSelected = true //选中当前的颜色
}
// 修改车的贴膜
const changeCarCoat = item => {
  coatList.value.forEach(obj => {
    // 把所有的选中都取消
    obj.isSelected = false
  })
  emitter.emit('changeCarCoat', item)
  item.isSelected = true
}
// 修改天空
const changeSky = item => {
  if (item.isSelected) return //如果已经选中 不能继续执行
  sceneList.value.forEach(obj => {
    // 把所有的选中都取消
    obj.isSelected = false
  })
  emitter.emit('changeSky', item)
  item.isSelected = true
}

// 修改视角
const changeLook = item => {
  if (item.isSelected) return //如果已经选中 不能继续执行
  lookList.value.forEach(obj => {
    // 把所有的选中都取消
    obj.isSelected = false
  })
  emitter.emit('changeLook', item)
  item.isSelected = true
}

// 监听浏览器宽高
const resizeRender = () => {
  window.addEventListener('resize', () => {
    renderer.setSize(carRef.value.clientWidth, carRef.value.clientHeight) //场景的宽高
    camera.aspect = carRef.value.clientWidth / carRef.value.clientHeight //摄像机的宽高
    // css3dRenderer.setSize(carRef.value.clientWidth, carRef.value.clientHeight) //3d渲染的宽高
    // css2dRenderer.setSize(carRef.value.clientWidth, carRef.value.clientHeight) //2d渲染的宽高

    camera.updateProjectionMatrix()
  })
}
</script>

<style lang="scss">
/* 容器 */
.wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.carRef {
  flex: 3;
  position: relative;
}
.tool {
  flex: 1;
  /* 预留底部总价标签位置 */
  padding-bottom: 60px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 右侧工具-公共 */
.group {
  padding: 10px 10px;
  text-align: center;
}
.group .title {
  font-size: 15px;
}
.item_wrap {
  display: flex;
  text-align: center;
}
.active {
  color: red;
  border: 1px solid red;
}
.group_list {
  overflow-y: scroll;
}
.group_list::-webkit-scrollbar {
  display: none;
}

/* 右侧工具-颜色 */

.item_wrap > div {
  flex: 1;
  font-size: 12px;
}
.item_wrap .col {
  width: 50px;
  height: 50px;
  display: inline-block;
}
.item_wrap p {
  margin: 5px;
}

.info_btn {
  padding: 10px 0;
  border: 1px solid lightgray;
}

/* 底部价格 */
.price {
  box-sizing: border-box;
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  border-top: 1px solid gray;
  align-items: center;
  width: 100%;
  background-color: white;
}

.price .next_btn {
  background-color: #bb0a30;
  box-sizing: border-box;
  font-size: 12px;
  color: white;
  padding: 10px 15px;
}
</style>
