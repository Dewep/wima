const express = require('express')
const bodyParser = require('body-parser')

class Server {
  constructor (app) {
    this.app = app

    this.server = express()
    this.controllers = []
  }

  async run () {
    this.server.use(bodyParser.json({ limit: '10mb' }))
    this.server.use(this.logger)

    const routingSteps = ['routingPublic', 'routingAuth', 'routing']

    for (let r = 0; r < routingSteps.length; r++) {
      const routingStep = routingSteps[r]

      for (let c = 0; c < this.controllers.length; c++) {
        const controller = this.controllers[c]

        if (controller[routingStep]) {
          controller[routingStep](this._registerControllerRoute(this.server, controller))
        }
      }
    }

    this.server.use(express.static('public'))

    this.server.use(this.errorHandling.bind(this))

    this.server.listen(this.app.config.server.port, this.app.config.server.host, () => {
      console.info('[server] running on', `${this.app.config.server.host}:${this.app.config.server.port}`)
    })
  }

  registerController (controller) {
    this.controllers.push(controller)
  }

  _registerControllerRoute (server, controller) {
    return function (method, route, handler, params) {
      const promiseAction = handler.bind(controller)
      server[method](
        route,
        async function (req, res, next) {
          try {
            let callNext = false
            let paramNext
            const nextHandler = function (param) {
              callNext = true
              paramNext = param
            }

            const boundParams = params ? params(req, res, nextHandler) : []
            const result = await promiseAction(...boundParams)

            if (callNext) {
              next(paramNext)
            } else {
              return res.json(result || { message: 'OK' })
            }
          } catch (error) {
            return next(error)
          }
        }
      )
    }
  }

  logger (req, res, next) {
    console.info('[server]', req.method, req.originalUrl, 'from', req.ip)
    next()
  }

  errorHandling (err, req, res, next) {
    if (!err.status) {
      err.status = 400
    }
    res.status(err.status)
    res.json({ error: err.message })
    console.error(err.stack)
  }
}

module.exports = Server
