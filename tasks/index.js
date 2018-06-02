const moment = require('moment')

class Tasks {
  constructor (app) {
    this.app = app
    this.tasks = []

    app.config.tasks.trigger.forEach(option => {
      const task = {}

      if (option.enabled !== false) {
        task.name = option.name
        task.hours = option.hours || null
        task.minutes = option.minutes || 0
        task.parameters = option.parameters || {}
        task.atServerStartup = option.atServerStartup
        this.tasks.push(task)
      }
    })
  }

  async run () {
    const promises = []

    this.tasks.forEach(task => {
      promises.push(this.startTriggerTask(task, true))

      if (task.atServerStartup) {
        promises.push(this.runTask(task.name, task.parameters))
      }
    })

    return Promise.all(promises)
  }

  async runTask (taskName, parameters) {
    try {
      return await require(`./${taskName}.task`)(this.app, parameters || {})
    } catch (err) {
      console.error(`[tasks.${taskName}] error:`, err)
      throw err
    }
  }

  async runTaskFromTrigger (task) {
    await this.runTask(task.name, task.parameters)
    this.startTriggerTask(task)
  }

  nextTrigger (task) {
    const now = moment()
    let nextTrigger = null

    if (task.hours === null) {
      return null
    }

    const checkTriggerDate = date => {
      const seconds = date.diff(now, 'seconds')

      if (seconds > 0 && (!nextTrigger || nextTrigger.seconds > seconds)) {
        nextTrigger = { date, seconds }
      }
    }

    checkTriggerDate(now.clone().hours(task.hours).minutes(task.minutes).startOf('minute'))
    checkTriggerDate(now.clone().add(1, 'day').hours(task.hours).minutes(task.minutes).startOf('minute'))

    return nextTrigger
  }

  startTriggerTask (task) {
    const trigger = this.nextTrigger(task)

    if (trigger !== null && trigger.seconds) {
      console.info('[task.run-task] setTimeout', task.name, trigger.seconds, 'seconds')
      setTimeout(this.runTaskFromTrigger.bind(this), trigger.seconds * 1000, task)
    }
  }
}

module.exports = Tasks
