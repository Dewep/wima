async function adminUser (app, parameters) {
  try {
    await app.service.user.create('dewep@pandalab.fr', 'RANDOM-PASSWORD', null, true)
    return true
  } catch (err) {
    return false // Admin already created
  }
}

module.exports = adminUser
