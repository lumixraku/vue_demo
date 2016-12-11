import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

new Vue({
  store, // inject store to all children  //store一般包含state mutations actions
  el: '#app',
  render: h => h(App)  //App 是一个Vue的component的options

  // https://vuejs.org/v2/guide/render-function.html#ad  这里有说明createElement可接受的参数  createElement一般简写为h
})



//render 是Vue2 中的写法
//功能和template差不多, 不过它是一个函数  根据参数 动态的创建元素
//h(App) 的执行结果是一个VNode对象

// render: function (createElement) {
//   return createElement(
//     'h' + this.level,   // tag name 标签名称
//     this.$slots.default // 子组件中的阵列
//   )
// },
// render 还可以使用jsx 动态的生成元素
// new Vue({
//   el: '#demo',
// -------------------1-------------------
//   render (h) {
//     return (
//       <AnchoredHeading level={1}>
//         <span>Hello</span> world!
//       </AnchoredHeading>
//     )
//   }
// })

//1处使用到了ES6{}中定义函数的的写法
//实际上相当于
// render: function render(h) {
//   return 'xx';
// }
