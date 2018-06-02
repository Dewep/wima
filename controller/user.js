const Controller = require('./controller')

class User extends Controller {
  routing (register) {
    register('get', '/api/user/:user/', this.getOne, req => [req.params.user])
  }

  async getOne (email) {
    return this.app.service.user.getOne(email)
  }
}

module.exports = User
