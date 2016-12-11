var Vue = require('vue');

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})

new Vue({
  el: '#render-list',
  data: {
    todos: [{
      text: 'Learn JavaScript'
    }, {
      text: 'Learn Vue.js'
    }, {
      text: 'Build Something Awesome'
    }]
  }
});


new Vue({
  el: '#userInput',
  data:{
    message3:'msg init value'
  },
  methods: {
    reverseMessage: function() {
      console.log(this.message3);//this可以访问到所有data中的变量
      this.message3 = this.message3.split('').reverse().join('');
    }
  }
});

new Vue({
  el:'#todo',
  data:{
    todoItem: '',
    todolist:[]
  },
  methods: {
    addTodo: function(){
      console.log(this); //this是当前整个Vue对象
      console.log(this.todoItem); //得到新增的一个值
      this.todolist.push({
        name:this.todoItem
      })
      this.todoItem = '';
    },
    removeTodo: function(idx){
      this.todolist.splice(idx,1); //删除
      console.log(this.todolist);
    }
  }
})
