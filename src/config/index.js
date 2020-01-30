const { NODE_ENV_USERNAME } = process.env

export default {
  host: String(NODE_APP_CONFIG.apiUrl).replace('$1', NODE_ENV_USERNAME),
  websocket: String(NODE_APP_CONFIG.websocketUrl).replace('$1', NODE_ENV_USERNAME),
  env_name: NODE_ENV_USERNAME,
}
