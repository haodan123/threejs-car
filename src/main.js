
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "./styles/index.scss";
import 'element-plus/dist/index.css'
import store from '@/stores/index.js'


const app = createApp(App)
app.use(ElementPlus)
app.use(store)

app.use(router)

app.mount('#app')
