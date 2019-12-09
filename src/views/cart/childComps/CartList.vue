<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" 
                      :key="index"
                      :itemInfo="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';
  import CartListItem from './CartListItem';
  import CartBottomBar from './CartBottomBar';

  export default {
    name: 'CartList',
    data () {
      return {
      }
    },
    computed:{
     cartList(){
       return this.$store.state.cartList
     }
   },
    components: {
      Scroll,
      CartListItem,
      CartBottomBar
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 93px);
  }
 .content {
  height: 100%;
  overflow: hidden;
  /* margin-top: 44px */
}
</style>