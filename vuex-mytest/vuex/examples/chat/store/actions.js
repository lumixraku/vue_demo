import * as api from '../api'
import * as types from './mutation-types'


//一个action的定义
// store = {
//     mutations: {
//         addXX: (state, {xxx}) => {
//             //....
//         }
//     },
//     actions: {
//         methodA: ({commit}) => {
//             //...
//         }
//     }
// }


//定义上actions 是处理异步的
//实际上就是在回调函数中调用了commit
//然而你可以手动调用commit  直接在某个普通的函数中  this.$store.commit('type', {...})
export const getAllMessages = ({ commit }) => {
  api.getAllMessages(messages => {

    //commit调用的是 mutations中定义的方法
    commit(types.RECEIVE_ALL, {
      messages
    })
  })
}

export const sendMessage = ({ commit }, payload) => {
  api.createMessage(payload, message => {
    commit(types.RECEIVE_MESSAGE, {
      message
    })
  })
}

export const switchThread = ({ commit }, payload) => {
  commit(types.SWITCH_THREAD, payload)
}
