<template>
<div class="thread-section">
    <div class="thread-count">
        <span v-show="unreadCount">
        Unread threads: {{ unreadCount }}
      </span>
    </div>
    <ul class="thread-list">
        <thread v-for="thread in threads" :key="thread.id" :thread="thread" :active="thread.id === currentThread.id" @switch-thread="switchThread">
        </thread>
    </ul>
</div>
</template>

<script>
import Thread from './Thread.vue'
import {
    mapGetters
} from 'vuex'

export default {
    name: 'ThreadSection',
    components: {
        Thread  //该组件用到的子组件
    },
    computed: {

        // 映射 this.threads 为 store.getters.threads
        // 下面的方式相当于
        // threads () {
        //     return this.$store.getters.threads
        // }
        ...mapGetters([
            'threads',
            'currentThread'
        ]),
        unreadCount() {
            const threads = this.threads
            return Object.keys(threads).reduce((count, id) => {
                return threads[id].lastMessage.isRead ?
                    count :
                    count + 1
            }, 0)
        }
    },
    methods: {
        switchThread(id) {
            this.$store.dispatch('switchThread', {
                id
            })
        }
    }
}
</script>
