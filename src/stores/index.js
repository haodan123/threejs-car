// import { createPinia } from "pinia";
// import piniaPluginPersist from 'pinia-plugin-persist'
// import { useTagStore } from './useTagStore'
// const store = createPinia();
// store.use(piniaPluginPersist)
// export default store;

// export { useTagStore }

import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
export * from './modules/useTagStore'
// export * from './modules/useTheme'
// 创建pinia实例
const pinia = createPinia()
// 使用pinia插件
pinia.use(persist)
// 导出pinia实例，给main使用
export default pinia
