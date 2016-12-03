<template>
<li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
        <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo({ todo: todo })">
        <label v-text="todo.text" @dblclick="editing = true"></label>
        <button class="destroy" @click="deleteTodo({ todo: todo })"></button>
    </div>

    <!-- :value 是 v-bind:value 的简写 也就是表示value属性的值从vue中读取-->
    <input class="edit" v-show="editing" v-focus="editing" :value="todo.text" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit">
</li>
</template>

<script>
import {
    mapMutations
} from 'vuex'

export default {
    name: 'Todo',
    props: ['todo'],
    data() {
        return {
            editing: false
        }
    },
    directives: {
        focus(el, {
            value
        }, {
            context
        }) {
            if (value) {
                context.$nextTick(() => {
                    el.focus()
                })
            }
        }
    },
    methods: {

        // 下面是一种简写  会将数组中的值映射为一些方法(创建一些方法)
        // 比如deleteTodo 映射 this.deleteTodo() 为 this.$store.commit('deleteTodo')
        ...mapMutations([
            'toggleTodo',
            'editTodo',
            'deleteTodo'
        ]),
        //toggleTodo 就会映射为(更通俗点  是创建了一个toggleTodo的方法, 其中有this.$store.commit语句)
        // toggleTodo(obj) {
        //     this.$store.commit('toggleTodo', obj);
        // },
        //同理 editTodo会实际上相当于
        // editTodo (payload) {
        //     this.$store.commit('editTodo', payload)
        // },
        doneEdit(e) {
            const value = e.target.value.trim()
            const { todo } = this  //读取props 中的todo
            if (!value) {
                this.deleteTodo({
                    todo
                })
            } else if (this.editing) {

                //参数对应mutation中的定义的editTodo
                this.editTodo({
                    todo,
                    value
                })
                this.editing = false
            }
        },
        cancelEdit(e) {
            e.target.value = this.todo.text
            this.editing = false
        }
    }
}
</script>
