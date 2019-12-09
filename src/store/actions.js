export default {
  addCart(context, payload) {
    //查找购物车数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
    if (oldProduct) {
      context.commit('addCount', oldProduct)
    } else {
      payload.count = 1
      context.commit('addToCart', payload)
    }
  }
}