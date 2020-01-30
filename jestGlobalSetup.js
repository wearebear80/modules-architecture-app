const { NODE_ENV_APP_CONFIG } = process.env
const config = require(`./config/${NODE_ENV_APP_CONFIG}.json`)

process.env.NODE_APP_CONFIG = {
  env: "development",
  apiUrl: "example.com"
}

export default () => {

}
