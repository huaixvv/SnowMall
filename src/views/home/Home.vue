<template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>
      <tab-control 
        :titles="['流行', '新款', '精选']" 
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
        :class="{'tab-control1': isTabFixed}"/>

  <scroll class="content" 
          ref="scroll" 
          :probeType="3"
          :pullUpLoad="true"
          @scroll="homeScroll"
          @pullingUp="homeLoadMore"
          >
    <home-swiper :banners="banners" 
                  class="home-banners"
                  @swiperImgLoad="homeSwiperImgLoad"
                  :class="{fixed: isTabFixed}"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control 
        :titles="['流行', '新款', '精选']" 
        @tabClick="tabClick"
        ref="tabControl2"/>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backtop" v-show="topBtnShow"/>
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
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';

//方法∏
import { getHomeMultiData, getHomeGoods } from 'network/home';
import { debounce } from 'common/debounce';

 export default {
   name: 'Home',
   data () {
     return {
       banners: [],
       recommends: [],
       goodsKinds: ['pop', 'new', 'sell'],
       currentIndex: 0,
       topBtnShow: false,
       taboffsetTop: 0,
       isTabFixed: false,
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
   mounted(){
     /**
      * 1.图片加载完成的事件监听
      */
     //使用防抖
     const refresh = debounce(this.$refs.scroll.refresh, 50)
     //3.监听item中图片加载完成    事件总线
     this.$bus.$on('itemImageLoad', () => {
      // 先判断scroll对象是否存在
      this.$refs.scroll && refresh()    
      })

      /**
       * 2.tab-control 吸顶的 设置
       */
      
   },

   methods: {
     /**
      * 事件监听
      */
     tabClick(index){
       this.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
       this.$refs.tabControl1.currentIndex = index
     },

     backtop(){
       this.$refs.scroll.scrollTo(0, 0, 500)       //通过ref拿到scroll组件对象 再拿到组件的data
     },

    //监听滚动
     homeScroll(position){
       //backtop 回到顶部是否显示
       if (position.y < -500) {
         this.topBtnShow = true
       }else{
         this.topBtnShow = false
       }

      //决定tabControl是否吸顶
      this.isTabFixed = (-position.y) >= this.taboffsetTop-44
     },

     homeLoadMore(){
       console.log("上拉加载更多");
       this.getHomeGoods(this.goodsKinds[this.currentIndex])
       //完成上拉加载更多后需要调用scroll.finishPullUp() 后才可以继续下一次上拉加载操作
       this.$refs.scroll.finishPullUp()
     },

    //轮播图加载完后计算tabcontrol的offsettop值
     homeSwiperImgLoad(){
       this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
       console.log( this.taboffsetTop);
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
    GoodsList,
    Scroll,
    BackTop
   }
 }
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 10;
}

/* .home-banners {
  margin-top: 44px;
} */


.content {
  height: calc(100% - 93px);
  overflow: hidden;
  /* margin-top: 44px */
}
.tab-control1 {
  position: absolute;
  width: 100%;
  z-index: 10
}

</style>