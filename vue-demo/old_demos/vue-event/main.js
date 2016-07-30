var Vue = require('vue');

var vm = new Vue({
  el: '#example',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // 方法内 `this` 指向 vm
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      // alert(event.target.tagName)
    },
    outer: function(event){
      alert('outer');
    }
  }
})

vm.greet() // -> 'Hello Vue.js!'