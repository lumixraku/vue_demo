var Vue = require('vue');
var data = {
  title: 'todos',
  todos: [{
    done: true,
    content: 'Learn JavaScript'
  }, {
    done: false,
    content: 'Learn Vue.js'
  }]
};

var vm = new Vue({
  el: '#app',
  data: {
    title: 'todos',
    todos: [{
      done: true,
      content: 'Learn JavaScript'
    }, {
      done: false,
      content: 'Learn Vue.js'
    }]
  },
  methods: {
    reverseMessage: function() {
      console.log(this.message3); //this可以访问到所有data中的变量
      this.message3 = this.message3.split('').reverse().join('');
    }
  }
});
console.log(vm.$el); //就是 #app这个元素
console.log(vm.title == data.title); // TRUE
