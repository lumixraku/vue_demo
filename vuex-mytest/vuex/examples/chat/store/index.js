import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const state = {
  currentThreadID: null,

  //和QQ一样  threads表示的某一个会话
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  }
}


//Store 一般包含state mutation actions getters
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})


//mutation 一般这样子
// mutations: {
//     addTodo (state, { text }) {
//       state.todos.push({
//         text,
//         done: false
//       })
//     },
// }
