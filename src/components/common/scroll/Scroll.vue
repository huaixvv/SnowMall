<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted(){

      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,    //默认会阻止原生事件 click
        probeType: this.probeType,    //是否监听滚动位置 可选（0， 1，2，3）
        pullUpLoad: this.pullUpLoad   //是否监听上拉事件
      })

      //监听滚动位置
      if (this.probeType == 2 || this.probeType == 3) {
          this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
      
      //监听scroll滚动到底部
      if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
      }

      
    },
    methods: {

      //滚动到具体位置
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time)
      },

      //
      finishPullUp(){
        this.scroll.finishPullUp()
      },

      //刷新scroll
      refresh(){
        //console.log(111);
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
 
</style>