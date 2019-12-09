<template>
 <div>
 <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad">
        </a>
      </swiper-item>
    </swiper>
 </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';

 export default {
   name: 'HomeSwiper',
   props: {
     banners: {
       type: Array,
       default(){
         return []
       }
     }
   },
   data() {
     return {
        isload: false,
     }
   },

  

    methods:{
      swiperImgLoad(){
        if(!this.isload){
          this.$emit('swiperImgLoad')
          this.isload = true
        }
    }
    },

   components: {
     Swiper,
     SwiperItem
   }
 }
</script>

<style>
 
</style>