var Vue = require('vue');


var example1 = new Vue({
  el: '#example-1',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

var example3 = new Vue({
  el: '#example-3',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

var data40 = {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  };
var example4_0 = new Vue({
  el: '#example-4_0',
  data: data40
})
data40.items.push({message: 'Hehe'});
//push()
// pop()
// shift()
// unshift()
// splice()
// sort()
// reverse()
//这些方法可以触发数组的更新


var data41 = {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  };
var example4_0 = new Vue({
  el: '#example-4_1',
  data: data41
})
//这样是不能检测到数组值的改动
data41.items[0] = {message:'wahaha'};
//vue提供了 $set来处理数组元素的赋值
data41.items.$set(0, {message:'wahaha'})