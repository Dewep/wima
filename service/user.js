const bcrypt = require('bcryptjs')

class User {
  constructor (app) {
    this.app = app
  }

  async getOne (email) {
    return this.app.mongo.getOne('user', { email })
  }

  async create (email, password, workHours, isAdmin) {
    const emailAlreadyUsed = await this.app.mongo.count('user', { email })

    if (emailAlreadyUsed > 0) {
      throw new Error('Email already used')
    }

    await this.app.mongo.insert('user', {
      email,
      password: await this.hashPassword(password),
      isAdmin: !!isAdmin,
      workHours: workHours || [0, 7, 7, 7, 7, 7, 0]
    })
  }

  async hashPassword (password) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, 8, function (err, hash) {
        if (err) {
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  }

  async checkPassword (password, hash) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hash, function (err, res) {
        if (err) {
          reject(err)
        } else if (res === true) {
          resolve()
        } else {
          reject(new Error('Bad password'))
        }
      })
    })
  }
}

module.exports = User
