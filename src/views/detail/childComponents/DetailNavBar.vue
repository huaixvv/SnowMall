<template>
  <div>
    <nav-bar>
      <div slot="left" class="backSvg" @click="backClick"> 
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
              :key="index"
              class="title-item"
              :class="{active: index === currentIndex}"
              @click="titleClick(index)">
              {{item}}
        </div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: '',
    data () {
      return {
        currentIndex: 0,
        titles: ['商品', '参数', '评论', '推荐']
      }
    },
    methods: {
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick(){
        this.$router.back()
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
 .title {
   display: flex;
   font-size: 13px;
 }

 .title-item {
   flex: 1;
 }

 .active {
   color: var(--color-high-text)
 }

 .backSvg img {
   vertical-align: middle;
   margin-bottom: 6px
 }
</style>