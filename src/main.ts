import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store/index'

import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App)
//引入router插件
app.use(router)
//引入vuex插件
app.use(store)

app.mount('#app')