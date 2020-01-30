import config from 'config'

const { host } = config

export default {
  CHECK_TOKEN_API: `${host}/check-token`,
  CHECK_LOGIN_API: `${host}/v2/check-login`,
  CHECK_PASSWORD_API: `${host}/v2/check-password`,
  LOGOUT_API: `${host}/logout`,
}
