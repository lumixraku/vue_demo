var Vue = require('vue');

var vm = new Vue({
  el: '#render-list',
  data: {
    a: 1,
    b: 2,
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

// watch ======================================
// a + b 实际上是 vm中的 a + b 这个表达式的值
vm.$watch('a + b', function (newVal, oldVal) {
  console.log('changed',newVal, oldVal);
})
// 实际上与下面相同  下面的方式更能减少歧义
vm.$watch(
  function () {
    return this.a + this.b
  },
  function (newVal, oldVal) {
    console.log('changed',newVal, oldVal);
  }
)
vm.a = 2;

// add ==========================================
vm.$add('newKey', 'newValue');
