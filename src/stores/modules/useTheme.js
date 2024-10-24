// import { defineStore } from "pinia";
// import { ref, watchEffect } from "vue";

// export const useThemeStore = defineStore('useTheme', () => {

//   const LOCAL_KEY = '__theme__'//存本地的key
//   const theme = ref(localStorage.getItem(LOCAL_KEY) || 'light') //主题 默认是亮色主题

//   const match = ref(matchMedia('prefers-color-scheme:dart'));


//   watchEffect(() => {
//     localStorage.setItem(LOCAL_KEY, theme.value)
//     document.documentElement.dataset.theme = theme.value //给thml设置主题
//   })


//   return { theme, match }
// }, // 开启本地存储 把数据存到本地
//   {
//     persist: true,
//   })