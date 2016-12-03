import { STORAGE_KEY } from './mutations'
import createLogger from '../../logger'


// 定义一个函数  localxxx = function(store){..}
const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
