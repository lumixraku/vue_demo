

<style src="todomvc-app-css/index.css"></style>

<template>
<section class="todoapp">
    <!-- header -->
    <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" @keyup.enter="addTodoEvent">
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
        <input class="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll({ done: !allChecked })">
        <ul class="todo-list">
            <todo v-for="todo in filteredTodos" :todo="todo"></todo>
        </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
        <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
        <ul class="filters">
            <li v-for="(val, key) in filters">
                <a :href="'#/' + key" :class="{ selected: visibility === key }" @click="visibility = key">{{ key | capitalize }}</a>
            </li>
        </ul>
        <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button>
    </footer>
</section>
</template>

<script>
import {
    mapMutations
} from 'vuex'
import Todo from './Todo.vue'

// 定义了一些函数  filter用的函数  在下面的computed会用到
const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
}


//由于使用了vue-loader 所以Component可以用vue文件的方式来写
//一个xx.vue就是一个组件  相当于 Vue.component('xx', ...);
export default {
    name: 'app', //component的名字
    components: {
        Todo
    },
    data() {
        return {
            visibility: 'all',
            filters: filters,
            todos: this.$store.state.todos
        }
    },
    computed: {

        // 通过增加一个computed函数的方式  使得this下有了一个todos变量
        // 个人觉得这样实现不太易懂  就把todos放到data中了
        // todos () {
        //   return this.$store.state.todos
        // },
        allChecked() {
            return this.todos.every(todo => todo.done)
        },
        filteredTodos() {
            return filters[this.visibility](this.todos)
        },
        remaining() {
            return this.todos.filter(todo => !todo.done).length
        }
    },
    methods: {
        addTodoEvent(e) {
            var text = e.target.value
            if (text.trim()) {

                // this.$store.commit('addTodo', {
                //     text
                // })
                this.addTodo({text})
            }
            e.target.value = ''
        },

        //这里的...实际上是ES6的 扩展语法
        //相当于给 methods {} 扩展出更多的key
        // mapMutations 的执行结果是一个{}对象
        ...mapMutations([
            'addTodo',
            'toggleAll',
            'clearCompleted'
        ])

    },

    //Vue2 的filters的定义和Vue1.x 不同
    filters: {
        //复数
        pluralize: (n, w) => n === 1 ? w : (w + 's'),
        capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
}
</script>
