import { defineStore } from "pinia";
import { ref } from "vue";

export const useTagStore = defineStore('tagStore', () => {
  const state = ref({
    tagList: [
      { path: '/', title: '首页' }
    ]
  })

  // 新增标签
  const setTagItem = (item) => {
    state.value.tagList.push(item)
  }
  // 删除标签
  const delTagItem = (index) => {
    if (index !== 0) {
      state.value.tagList.splice(index, 1)
    }
  }
  // 删除其他标签
  const delOthersTags = (index) => {
    // console.log(index);
    const others = state.value.tagList.filter((item, i) => {
      return i == index || i == 0
    })
    state.value.tagList = others
    // console.log(others);
  }

  // 删除除首页外所有的标签
  const delALlTags = () => {
    const oneTag = state.value.tagList.filter((item, i) => {
      return i == 0
    })
    state.value.tagList = oneTag
    // console.log(oneTag);
  }


  return { state, setTagItem, delTagItem, delOthersTags, delALlTags }
}, // 开启本地存储 把数据存到本地
  {
    persist: true,
    // strategies: [
    //   {
    //     key: 'user',
    //     storage: localStorage,
    //   },
    // ],
  })
