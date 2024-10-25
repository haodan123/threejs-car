import { ref } from "vue"


// 车漆颜色
export const colorList = ref([
  {
    color: '#ff9900',
    title: '土豪金',
    isSelected: false,
  },
  {
    color: '#343a40',
    title: '传奇黑',
    isSelected: false,
  },
  {
    color: '#409EFF',
    title: '海蓝',
    isSelected: false,
  },
  {
    color: '#6600ff',
    title: '玫瑰紫',
    isSelected: false,
  },
  {
    color: '#DCDFE6',
    title: '银灰色',
    isSelected: false,
  },

])
// 贴膜列表
export const coatList = ref([
  {
    name: '高光',
    price: 0,
    isSelected: true,
  },
  {
    name: '磨砂',
    price: 20000,
    isSelected: false,
  }
])

// 场景列表
export const sceneList = ref([
  {
    name: '展厅',
    isSelected: true,
  },
  {
    name: '户外',
    isSelected: false,
  }
])

// 视角列表
export const lookList = ref([
  {
    name: '驾驶位',
    data: 'main',
    isSelected: false,
    // 坐标的位置是用轨道控制器的change事件一个一个调试出来的
    camera: {
      x: 0.36,
      y: 0.96,
      z: -0.16
    },
    controls: {
      x: 0.36,
      y: 0.87,
      z: 0.03
    }
  },
  {
    name: '副驾驶',
    data: 'copilot',
    isSelected: false,
    camera: {
      x: -0.39,
      y: 0.87,
      z: 0.07
    },
    controls: {
      x: -0.39,
      y: 0.85,
      z: 0.13
    }
  },
  {
    name: '外观',
    data: 'outside',
    isSelected: true,
    camera: {
      x: 3,
      y: 1.5,
      z: 3
    },
    controls: {
      x: 0,
      y: 0,
      z: 0
    }
  }
]
)

