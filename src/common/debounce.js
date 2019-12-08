/**
 * 防抖方法
 * 
 */

export function debounce(func, delay) {

  let timer = null

  return function (...args) {

    //如果下一次执行来的时间在delay内，
    //则会取消上一次timer执行，从而达到防抖的目的
    if (timer) clearTimeout(timer)    
    timer = setTimeout(() => {
      func.call(this, args)
    }, delay)
  }
 }