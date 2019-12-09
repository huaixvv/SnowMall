import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
Vue.config.productionTip = false

//定义事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

