const env = require('dotenv')

function getAppEnvironment() {
  let config
  switch (process.env.NODE_ENV) {
    case 'development':
      config = env.config({ path: 'development.env' })
      break
    case 'production':
      config = env.config({ path: 'production.env' })
      break
    default:
      config = env.config({ path: 'production.env' })
  }
  return config
}

return getAppEnvironment()
