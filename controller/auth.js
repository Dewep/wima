const crypto = require('crypto')
const Controller = require('./controller')

class Auth extends Controller {
  constructor (app) {
    super(app)

    this.apiKeys = {}
  }

  routingPublic (register) {
    register('use', '/', this.headerAuthorization, (req, res, next) => [req.headers.authorization, req, next])
    register('post', '/api/auth/', this.connectionWithPassword, req => [req.body.email, req.body.password])
  }

  routingAuth (register) {
    register('use', '/api', this.mustBeConnected, (req, res, next) => [req.user, next])
    // register('use', '/cdn', this.mustBeConnected, (req, res, next) => [req.user, next])
  }

  routing (register) {
    register('get', '/api/auth/', user => user, req => [req.user])
  }

  async generateNewApiKey (email) {
    const apiKey = await new Promise(function (resolve, reject) {
      crypto.randomBytes(48, function (err, buffer) {
        if (err) {
          reject(err)
        } else {
          resolve(buffer.toString('hex'))
        }
      })
    })

    this.apiKeys[apiKey] = email

    return apiKey
  }

  async headerAuthorization (apiKey, req, next) {
    req.user = null

    if (apiKey) {
      if (!this.apiKeys[apiKey]) {
        throw new Error('Bad API key')
      }

      req.user = await this.app.service.user.getOne(this.apiKeys[apiKey])
      delete req.user.password
    }

    next()
  }

  async connectionWithPassword (email, password) {
    const user = await this.app.service.user.getOne(email)

    await this.app.service.user.checkPassword(password, user.password)

    const apiKey = await this.generateNewApiKey(user.email)

    delete user.password
    return { apiKey, user }
  }

  async mustBeConnected (user, next) {
    if (!user) {
      throw new Error('You must be connected')
    }

    next()
  }
}

module.exports = Auth
