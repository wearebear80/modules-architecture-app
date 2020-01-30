import { getToken } from 'helpers/token'
import endpoints from './endpoints'

interface IAuthData {
  login: string,
  password: string
}

export default {
  auth: ({ login, password }: IAuthData) => ({
    method: 'POST',
    url: endpoints.CHECK_PASSWORD_API,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      login,
      password,
    },
  }),
  logout: () => ({
    request: {
      method: 'PUT',
      url: endpoints.LOGOUT_API,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${getToken()}`,
      }
    }
  }),
  // ... some api - actions
}
