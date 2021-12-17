/**
 * uname:Yaoml
 */
/**
 * @type string url  链接地址
 * @type function onMessage 消息回调函数
 * @type ogject || string  heartbeat 自定义心跳参数 会定时发送给后台
 * @type function typecllk 链接消息的回调 true 链接成功 false 连接失败 重新链接
 * @type number timeout  心跳发送的时间（间隔多少时间发送心跳）
 * @type number serverTimeout  服务器超时时间
 *
 * @createdWebSocket 创建websocket链接
 * @websocketsend 发送websocket消息
 * @closeWebSocket 关闭websocket链接
 * @onbeforeunload 关闭浏览器之前关闭链接
 * @reset 重置心跳
 */

export default class WebSocketClass {
  constructor({ url, onMessage, heartbeat, typecllk, timeout, serverTimeout }) {
    this.data = 0
    this.timeout = timeout || 3 * 1000 // 每隔3s发送心跳
    this.serverTimeout = serverTimeout || 10 * 1000 // 服务器超时时间
    this.timeoutObj = null // 心跳计时器
    this.serverTimeoutObj = null // 服务器超时计时器
    this.timeoutnum = null // 心跳计数
    this.websocket = null // 创建的 websocket 实例
    this.lockReconnect = false // 防止重复创建
    // 以下为实例化传入参数
    this.host = url // 链接地址
    this.setOnmessageMessage = onMessage // 传入的函数
    this.heartbeat = heartbeat // 心跳数据
    this.typecllk = typecllk // 连接状态回调
  }
  createdWebSocket() {
    // 如果websocket 等于null 才创建连接 否则不创建
    // if (this.websocket == null) {
    // 创建链接
    this.websocket = new WebSocket(this.host)
    // 连接错误callback
    this.websocket.onerror = this.setErrorMessage.bind(this)
    // 连接成功callback
    this.websocket.onopen = this.setOpenMessage.bind(this)
    // 收到消息callback
    this.websocket.onmessage = this.setOnmessageMessage.bind(this)
    // 连接关闭callback
    this.websocket.onclose = this.setOncloseMessage.bind(this)
    // 监听窗口关闭,主动关闭websocket连接
    window.onbeforeunload = this.setOnbeforeunload
    // } else {
    //   console.log('已创建连接请勿重复创建')
    // }
  }
  // 发送心跳包
  start() {
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(() => {
      if (this.websocket && this.websocket.readyState === 1) {
        // 状态等于1时发送心跳包
        this.websocketsend(this.heartbeat) // 和后端商量 定义心跳消息 发送消息后
      } else {
        // 重新链接
        this.reconnect()
      }
      // 开启超时定时器
      this.serverTimeoutObj = setTimeout(() => {
        // 超时关闭
        this.websocket.close()
      }, this.serverTimeout)
    }, this.timeout)
  }
  // 重新连接
  reconnect(host) {
    if (this.lockReconnect) return
    this.lockReconnect = true
    this.timeoutnum && clearTimeout(this.timeoutnum)
    this.timeoutnum = setTimeout(() => {
      this.createdWebSocket(host)
      this.lockReconnect = false
    }, 5000)
  }
  // 重置心跳 不调用则不开启软心跳
  reset() {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    // this.start() 不开启心跳
  }
  // 连接错误消息
  setErrorMessage() {
    this.reconnect() // 调用重新链接
    this.typecllk(false, this.websocket.readyState) // 回调链接成功还是失败
    console.log('websocket连接错误' + ' 状态码' + this.websocket.readyState)
  }
  // 连接成功消息
  setOpenMessage() {
    // this.start() 不开启心跳
    // 提示消息自定
    this.typecllk(true, this.websocket.readyState) // 回调链接成功还是失败
    console.log('websocket连接成功' + ' 状态码' + this.websocket.readyState)
  }
  // 链接关闭回调
  setOncloseMessage() {
    console.log('关闭断开链接后重连')
    // this.reconnect(this.host) // 关闭链接重新链接 此处注释 关闭后不在打开链接
  }
  // 关闭浏览器之前关闭链接 或者页面跳转关闭当前连接
  onbeforeunload() {
    this.closeWebSocket()
  }
  // 发送数据
  websocketsend(message) {
    this.websocket.send(message)
  }
  // 关闭链接
  closeWebSocket() {
    // 关闭连接则不再启用心跳 清除心跳
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    // 关闭连接
    this.websocket.close()
  }
}
