import Toast from './Toast';

const obj = {}

obj.install = function (Vue) {

	//1.创建组件构造器
	const taostContrustor = Vue.extend(Toast)

	//2.用new的方式，根据组件构造器，可以创建出一个组件对象
	const taost = new taostContrustor()

	//3.将组件对象，手动挂载到某一个元素中
	taost.$mount(document.createElement('div'))

	//4.taost.$el对应的就是div
	document.body.appendChild(taost.$el)

	Vue.prototype.$toast = taost
 }

 export default obj