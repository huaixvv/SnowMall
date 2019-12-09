<template>
  <div class="detail-swiper">
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from "components/common/swiper";

  export default {
    name: '',
    props: {
      topImages: {
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
      Swiper, 
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }

  
</style>