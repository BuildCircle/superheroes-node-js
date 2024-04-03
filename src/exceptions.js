class  NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

class  HeroesApiNotAvailable extends Error {
  constructor(message) {
    super(message)
    this.name = 'HeroesApiNotAvailable'
  }
}

module.exports = {
  NotFoundError,
  HeroesApiNotAvailable
}
