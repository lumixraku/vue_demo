
//和 node 一样  已经通过npm装了 vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'


import { state, mutations } from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins
})
