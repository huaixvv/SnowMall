<template>
 <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info"> 
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">❤️ {{goodsItem.cfav}}</span>
    </div>
 </div>
</template>

<script>
 export default {
   name: 'GoodsListItem',
   props: {
     goodsItem: {
       type: Object,
       default(){
         return {}
       }
     }
   },
   data () {
     return {
     }
   },
   methods: {
     imageLoad(){
       this.$bus.$emit('itemImageLoad')   //事件总线
     }
   }
 }
</script>

<style>
 .goods-item {
   padding-bottom: 25px;
   width: 49%;
 }

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

 .goods-info {
   font-size: 12px;
   overflow: hidden;
   text-align: center;
   margin-top: 7px;
 }

 .goods-info p {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   margin-bottom: 3px
 }

 .goods-info .price {
   color: var(--color-high-text);
   margin-right: 20px
 }
</style>