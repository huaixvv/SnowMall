<template>
 <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车 共{{cartLength}}件商品</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>

 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

 export default {
   name: 'Cart',
   data () {
     return {
     }
   },
   computed:{
     cartLength(){
       return this.$store.state.cartList.length
     }
   },
   components: {
     NavBar,
     CartList,
     CartBottomBar
   }
 }
</script>

<style>
   .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 10;
  }

  #cart{
    height: 100vh;
  }
</style>