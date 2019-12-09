import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import toast from 'components/common/toast';

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false

//定义事件总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载   :src=“”  替换成 v-lazy=“”
Vue.use(VueLazyLoad, {
  //这里可以定义lazyload参数
  loading: require('./assets/img/common/placeholder.png')   //图片正在加载中的显示
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

