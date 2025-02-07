import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import '@/assets/scss/reset.scss'
import '@/assets/iconfont/iconfont.css' // 引入字体样式
import '@/assets/iconfont/iconfont.js' // 引入symbol样式
import './plugins/vant.js'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
