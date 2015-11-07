var Vue = require('vue');

// Vue.extend=================================
// 创建可复用的 Profile 组件构造函数
var Profile = Vue.extend({
  template: '<p>{{hello}} {{firstName}} {{lastName}} aka {{alias}}</p>'
})
// 创建一个 Profile 组件的实例
var profile = new Profile({
  //el: '#mount-point',//OK
  data: {
    firstName : 'Walter',
    lastName  : 'White',
    alias     : 'Heisenberg'
  }
})
// 挂载到元素上
// profile.$mount('#mount-point');


//Component================================
Vue.component('param-demo', {
  props: ['size', 'myMessage'], // 数组写法
  compiled: function () {
    console.log(this.size)    // -> 100
    console.log(this.myMessage) // -> 'hello!'
  }
});
Vue.component('prop-validation-demo', {
  props: {
    size: Number,
    name: {
      type: String,
      required: true
    }
  }
});

//methods==========
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++;
    }
  }
})
vm.plus();
console.log(vm.a);


//computed====================================
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 只需要 getter 时，直接用一个函数即可
    aDouble: function () {
      return this.a * 2
    },
    // 同时提供 getter 与 setter
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
console.log(vm.aDouble); //2

vm.aPlus = 3; //调用了set方法
console.log(vm.a); //2
console.log(vm.aPlus); //3
console.log(vm.aDouble); //4


//template==========================
//默认是replace  若设置replace为false  则是往元素中插入编译的元素
new Vue({
  el: '#template',
  data:{
    textValue: 'hehehe'
  },
  template: '<p>{{textValue}}</p>'
});


//事件============================
var vm = new Vue({
  el:'#events',
  created: function(){
    console.log(this.$el); //此时$el并没有准备好
    console.log('created');
  },
  ready:function(){
      console.log(this.$el);
      console.log('ready');
  },
  events: {
    //更多关于生命周期 参看http://cn.vuejs.org/api/options.html#created
    'hook:created': function () {
      console.log(this.$el); //此时$el并没有准备好
      console.log('hook created!')
    },
    'hook:ready':function(){
      console.log(this.$el);
      console.log('hook:ready');
    },
    greeting: function (msg) {
      console.log(msg)
    },
    // 也可以用方法名字符串
    bye: 'sayGoodbye'
  },
  methods: {
    sayGoodbye: function () {
      console.log('goodbye!')
    }
  }
}) // -> created!
vm.$emit('greeting', 'hi!') // -> hi!
vm.$emit('bye')             // -> goodbye!


//watch 当变量发生变化时触发=============
var vm = new Vue({
  data: {
    a: 1,
    b:'sss',
    c:{
      key: 'val'
    }
  },
  methods:{
    someMethod: function(val, oldVal){
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  watch: {
    'a': function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名字符串
    'b': 'someMethod',
    // 深度观察
    'c': {
      handler: function (val, oldVal) {
      console.log('new: %s, old: %s', JSON.stringify(val), JSON.stringify(oldVal));
      },
      deep: true
    }
  }
})
vm.a = 2 // -> new: 2, old: 1
vm.b = 'lala';
vm.c.key = 'newVal';



