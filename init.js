const path = require('path')
const _ = require('lodash')

module.exports = async function initServer (app, rootPath) {
  try {
    // Init modules
    const modules = app.modules.map(mod => {
      const nameParts = mod.split('/').map(part => _.camelCase(part))

      let instance = app
      for (let i = 0; i < nameParts.length - 1; i++) {
        instance[nameParts[i]] = {}
        instance = instance[nameParts[i]]
      }

      return {
        instance,
        key: nameParts[nameParts.length - 1],
        directory: path.join(rootPath || process.cwd(), mod)
      }
    })

    // Load modules
    for (let index = 0; index < modules.length; index++) {
      const ComponentClass = require(modules[index].directory)
      modules[index].instance[modules[index].key] = new ComponentClass(app)
    }

    // Run modules
    for (let index = 0; index < modules.length; index++) {
      if (modules[index].instance[modules[index].key].run) {
        await modules[index].instance[modules[index].key].run()
      }
    }
  } catch (err) {
    console.error('[run-error]', err)
    process.exit(1)
  }
}
