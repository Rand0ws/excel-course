export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })

    return true
  }

  // on, listen
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// Example
// const emitter = new Emitter()
// const unsub = emitter.subscribe('test', data => console.log('Sub:', data))
//
// emitter.emit('123213', 42)
//
// setTimeout(() => {
//   emitter.emit('test', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('test', 'After 4 seconds')
// }, 4000)
