<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="detailScroll">
    <!-- <ul>
      <li v-for="item in $store.state.cartList" :key="item.id">{{item}}</li>
    </ul> -->
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详情 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品参数 -->
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <!-- 评论 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <!-- 推荐商品 -->
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backtop" v-show="topBtnShow"/>
    <detail-bottom-bar class="detail-bottom-bar" @addToCart="addToCart" />
  </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar';
  import DetailSwiper from './childComponents/DetailSwiper';
  import DetailBaseInfo from './childComponents/DetailBaseInfo';
  import DetailShopInfo from './childComponents/DetailShopInfo';
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo';
  import DetailParamInfo from './childComponents/DetailParamInfo';
  import DetailCommentInfo from './childComponents/DetailCommentInfo';
  import DetailBottomBar from './childComponents/DetailBottomBar';

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/content/backTop/BackTop';

  import { getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import { backTopMixin } from 'common/mixin';


  export default {
    name: 'Detail',
    data () {
      return {
       iid: null,
       topImages:[],
       goods: {},
       shop: {},
       detailInfo: {},
       paramInfo: {},
       commentInfo: {},
       recommends: [],
       themeTopYs:[],    //记录商品、参数、评论、推荐的位置 --offsetTop
       currentIndex: 0
      }
    },
    mixins:[backTopMixin],
    created(){
      this.iid = this.$route.params.id
      //请求详情数据
      getDetail(this.iid).then(res => {
        //console.log(res);

        const data = res.data.result
        this.topImages = data.itemInfo.topImages
        //封装商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //封装店铺信息
        this.shop = new Shop(data.shopInfo)
        //保存商品详情信息
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //dom渲染完成后回调  ps：dom渲染完成了，但是对应的图片未必渲染完
        // this.$nextTick(() =>{
        //     this.themeTopYs.push(0)
        //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //     console.log(this.themeTopYs);
        // })
      })

      //请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.data.list
      })

    },
    mounted(){
     
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      },

      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 200)
      },

      //滚动与标题的联动效果
      detailScroll(position){
        // console.log(position);
        //1.获取Y值
        const positionY = -position.y + 93
        //2.positionY与主题中的值进行比较   [0, 7000, 8000,9000]
        // 0-7000       index = 0
        // 7000-8000    index = 1
        // 8000-9000    index = 2
        // 9000-MAX_VALUE       index = 3
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && 
            (positionY>=this.themeTopYs[i] && 
            positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }  
        }

        //回到顶部
        this.backToTop(position)
      },

      //加入购物车
      addToCart(){
        console.log(1111);
        //封装
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //添加到购物车   vuex--store
        this.$store.dispatch('addCart', product)
      }


    },

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px)
  }
  .detail-bottom-bar {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 49px;
  }

</style>