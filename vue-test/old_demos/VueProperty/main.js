var Vue = require('vue');

var vm = new Vue({
  el: '#render-list',
  data: {
    vary: 'heh',
    todos: [{
      text: 'Learn JavaScript'
    }, {
      text: 'Learn Vue.js'
    }, {
      text: 'Build Something Awesome'
    }]
  }
});
console.log(vm.$el);
console.log(vm.$data); //得到一个Observer对象 包括data中的对象以及对应的get set函数
console.log(vm.$options); //el filters directives等
// console.log(vm.$parent);//返回当前vm的父对象 如果有的话
console.log(vm.$children);//返回当前实例的直接子实例数组
console.log(vm.$root);