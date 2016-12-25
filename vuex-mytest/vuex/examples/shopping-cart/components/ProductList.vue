<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    products: 'allProducts'
  }),

  //这是一种简写   mapActions将会返回默认定义的action对象
  methods: mapActions([
    'addToCart'
  ]),
  //相当于
  // methods: {
  //     addToCart (p){
  //         this.$store.dispatch('addToCart', p)
  //     }
  // },
  // 又相当于
  // methods: {
  //     addToCart (product){
  //       //在这个例子中  actions并么有做什么其他的事情  实际上调用的是 mutation中的方法
  //       this.$store.commit('ADD_TO_CART', product)
  //     }
  // },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>


<comments type="text/haha">
下面是mapActions的实现
mapActions (actions) {
  var res = {}
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      //相当于
      //this.$store.dispatch(val, ......) 所以简写中甚至连要传递的对象都省去了
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
}


</comments>
