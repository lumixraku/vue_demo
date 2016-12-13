<template>
<div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    //mapGetters 返回一个{}
    // 映射 this.doneCount 为 store.getters.doneTodosCount
    // 下面的方式相当于
    // evenOrOdd () {
    //     return this.$store.getters.evenOrOdd
    // }

    computed: mapGetters([
        'evenOrOdd'
    ]),

    //上面相当于
    // computed: {
    //     evenOrOdd: function(){
    //         return this.$store.getters.evenOrOdd;
    //     }
    // },


    //和mapMutation相似
    //mapActions 返回一个{}
    //这里这个对象有四个key
    //
    //'increment': function(){
    // this.$store.dispatch('increment')  //通过$store.dispatch('methodname')调用action中的方法
    // }
    methods: mapActions([
        'increment',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
    ])
}



</script>
