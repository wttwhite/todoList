let observe = {
  message: {

  },
  register: (type, fn) => {
    this.message[type] = fn
  },
  fire: (type) => {
    this.message[type]()
  },
  remove: (type) => {
    delete this.message[type]
  }
}