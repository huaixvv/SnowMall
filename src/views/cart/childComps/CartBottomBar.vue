<template>
  <div class="bottom-bar">
    <div class="checkAll">
      <check-button class="check-btn" 
                    :isChecked="isSelectAll"
                    @click.native="checkAllClick"/>
      <span>全选</span>
      <div class="total">合计：￥{{totalPrice}}</div>
      <div class="calculateBtn">去计算({{checkedLength}})</div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      //总价格
      totalPrice(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      //选中了几个商品
      checkedLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      //是否全选中
      isSelectAll(){
        if(this.$store.state.cartList.length === 0) return false
        return this.$store.state.cartList.every(item => item.checked)
      }
    },
    methods: {
      checkAllClick () {
        if(this.isSelectAll){   //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{                 //没有全部选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    bottom: 40px;
    line-height: 40px
  }

  .checkAll{
    display: flex;
    align-items: center;
    margin-left: 13px
  }

  .check-btn{
    height: 20xp;
    width: 20px;
    line-height: 20px;
    margin-right: 5px
  }

  .total{
    /* background-color: red; */
    margin-left: 25px
  }

  .calculateBtn{
    background-color: var(--color-high-text);
    width: 25%;
    position: absolute;
    text-align: center;
    right: 0;
    color: #fff
  }
</style>
