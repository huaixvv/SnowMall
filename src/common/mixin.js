import BackTop from 'components/content/backTop/BackTop';

export const backTopMixin = {
  components: {
    BackTop
  },
  
  data() { 
    return {
      topBtnShow: false,
    }
  },
  methods: {
    backtop(){
      this.$refs.scroll.scrollTo(0, 0, 500)       //通过ref拿到scroll组件对象 再拿到组件的data
    },

    backToTop(position){
      //backtop 回到顶部是否显示
     if (position.y < -500) {
       this.topBtnShow = true
     }else{
       this.topBtnShow = false
     }
  },
  }
}