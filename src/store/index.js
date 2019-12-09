import Vue from 'vue';
import Vuex from 'vuex';
import  mutations  from './mutations';
import  actions  from './actions';

//安装插件
Vue.use(Vuex)

//创建store对象

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  //mutations 唯一的目的就是修改state中的状态
  //mutations 中的每个方法尽可能完成的事件比较单一一点  不然经量使用actions
  mutations,
  actions,
})

//挂载Vue实例上
export default store
