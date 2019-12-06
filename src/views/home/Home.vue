<template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>
   <home-swiper :banners="banners" class="home-banners"/>
   <recommend-view :recommends="recommends"/>
   <feature-view/>
   <tab-control 
      :titles="['流行', '新款', '精选']" 
      class="tab-control"
      @tabClick="tabClick"/>
   <goods-list :goods="showGoods"></goods-list>
 </div>
</template>

<script>
//home --> 子组件
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import  FeatureView from "./childComps/FeatureView";

//公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
//方法∏
import { getHomeMultiData, getHomeGoods } from 'network/home';

 export default {
   name: 'Home',
   data () {
     return {
       banners: [],
       recommends: [],
       goodsKinds: ['pop', 'new', 'sell'],
       currentIndex: 0,
       goods: {
         'pop': {page: 0, list: []},
         'new': {page: 0, list: []},
         'sell': {page: 0, list: []},
       }
     }
   },
   computed: {
     showGoods(){
       return this.goods[this.goodsKinds[this.currentIndex]].list
     }
   },
   created(){
     //1.请求多个数据
     this.getHomeMultiData()

     //2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
   },
   methods: {

     /**
      * 事件监听
      */
     tabClick(index){
       this.currentIndex = index
     },


     /*
      请求相关
     */
     getHomeMultiData(){
       getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
     })
     },
     
     getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          //console.log(this.goods[type].list);
     })
     }
   },
   components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList
   }
 }
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
}

.home-banners {
  margin-top: 44px;
}

.tab-control {
  position: sticky;
  top: 44px;
}

</style>