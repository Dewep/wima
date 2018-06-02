const pkg = require('./package.json')
const config = require('./config')
const initServer = require('./init')

initServer({
  release: pkg.name + '.' + pkg.version,
  config,
  modules: [
    'mongo',

    'service/user',

    'server',

    'controller/auth',
    'controller/user',

    'tasks'
  ]
})
