<template>
 <div class="goods">
   <goods-list-item 
    v-for="item in goods"
    :goodsItem="item"
    :key="item.id"/>
 </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';

 export default {
   name: 'GoodsList',
   props: {
     goods:{
      type: Array,
      default(){
        return []
      }
     }
   },
   data () {
     return {
     }
   },
   components: {
     GoodsListItem
   }
 }
</script>

<style>
 .goods {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   padding: 0 3px;
   margin-bottom: 50px
 }



</style>