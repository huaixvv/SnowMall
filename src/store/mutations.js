export default {
  addCount(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    state.cartList.push(payload)
  }
}