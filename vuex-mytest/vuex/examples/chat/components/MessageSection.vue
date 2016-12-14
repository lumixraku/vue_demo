<template>
<div class="message-section">
    <h3 class="message-thread-heading">{{ thread.name }}</h3>
    <ul class="message-list" ref="list">
        <message v-for="message in sortedMessages" :key="message.id" :message="message">
        </message>
    </ul>
    <textarea class="message-composer" @keyup.enter="sendMessage"></textarea>
</div>
</template>

<script>
import Message from './Message.vue'
import * as api from '../api'

import {
    mapGetters
} from 'vuex'

export default {
    name: 'MessageSection',
    components: {
        Message
    },
    computed: {
        ...mapGetters({
            thread: 'currentThread',
            messages: 'currentMessages'
        }),
        sortedMessages() {
            return this.messages
                .slice()
                .sort((a, b) => a.timestamp - b.timestamp)
        }
    },
    watch: {
        'thread.lastMessage': function() {
            this.$nextTick(() => {
                const ul = this.$refs.list
                ul.scrollTop = ul.scrollHeight
            })
        }
    },
    methods: {
        sendMessage(e) {
            const text = e.target.value
            if (text.trim()) {

                //通过store.dispatch 调用action的方法 ---> action再commit
                //实际上还是调用的mutations中定义的方法
                this.$store.dispatch('sendMessage', {
                    text,
                    thread: this.thread
                })


                //当然了   你可以手动调用commit 来调用mutation中的方法
                //actions 只是一种将异步操作都封装在一起的一种约束
                
                //createMessage 会将text封装成一个完整的message对象
                //并在回调函数中返回
                // api.createMessage({
                //     text,
                //     thread: this.thread
                // }, msg => {
                //     console.log('msg', msg);
                //     this.$store.commit('RECEIVE_MESSAGE', {
                //         message: msg
                //     })
                // })
                e.target.value = ''
            }
        }
    }
}
</script>
