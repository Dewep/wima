module.exports = {
  server: {
    host: '127.0.0.1',
    port: 3134
  },
  tasks: {
    trigger: [
      {
        name: 'admin-user',
        atServerStartup: true
      }
    ]
  },
  mongo: {
    host: 'localhost',
    port: 27017,
    database: 'wima'
  }
}
