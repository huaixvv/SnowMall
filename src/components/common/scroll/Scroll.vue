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
        default: true
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
      }),

      //监听滚动位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      //监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        //console.log('上拉加载更多');
      })
    },
    methods: {

      //滚动到具体位置
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time)
      },

      //
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>
 
</style>