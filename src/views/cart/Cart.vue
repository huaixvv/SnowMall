<template>
 <div id="cart">
   <!-- 导航 -->
   <nav-bar class="cart-nav">
     <div slot="center">购物车 共{{cartLength}}件商品</div>
   </nav-bar>
   <!-- 商品列表 -->
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

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
     NavBar
   }
 }
</script>

<style>
   .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 10;
}
</style>