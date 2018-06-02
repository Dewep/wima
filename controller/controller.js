class Controller {
  constructor (app) {
    this.app = app

    this.app.server.registerController(this)
  }
}

module.exports = Controller
