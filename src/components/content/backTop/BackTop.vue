<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    methods: {
     
    },
    data () {
      return {
      }
    },
    
  }
</script>

<style scoped>
 .back-top{
   /* position: absolute; */
   position: fixed;
   right: 6px;
   bottom: 50px;
 }

 .back-top img{
   width: 43px;
   height: 43px;
 }
</style>