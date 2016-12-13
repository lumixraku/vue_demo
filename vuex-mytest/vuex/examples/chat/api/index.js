const data = require('./mock-data')
const LATENCY = 16

export function getAllMessages (cb) {
  setTimeout(() => {
    cb(data)
  }, LATENCY)
}

//这里是模拟网络请求的样子  所以使用延迟 + 回调的方式
export function createMessage ({ text, thread }, cb) {
  const timestamp = Date.now()
  const id = 'm_' + timestamp
  const message = {
    id,
    text,
    timestamp,
    threadID: thread.id,
    threadName: thread.name,
    authorName: 'Evan'
  }
  setTimeout(function () {
    cb(message)
  }, LATENCY)
}
