import { createAction } from 'redux-actions'
import { SUCCESS, FAIL } from 'helpers/redux'
import api from './index'
import {
  IUiType,
  IAuthState,
  IAuthUser,
} from '../types'

export const AUTH = 'auth/AUTH'
export const LOGOUT = 'auth/LOGOUT'

export const logout = createAction(LOGOUT, api.logout)

type IAuthActionType = typeof AUTH | typeof LOGOUT

interface IAuthAction<T> {
  type: IAuthActionType
  payload: T
}

export const apiHandlers = {
  [AUTH]: (state: IAuthState) => ({
    ...state,
    isLoading: true,
  }),
  [SUCCESS(AUTH)]: (state: IAuthState, { payload }: IAuthAction<{ data: { data: IAuthUser } }>) => {
    const user: IAuthUser = payload.data.data
    return {
      ...state,
      user,
      isTokenValid: true,
      uiType: IUiType.AUTHORIZED,
      isLoading: false,
    }
  },
  [FAIL(AUTH)]: (state: IAuthState) => ({
    ...state,
    isLoading: false,
    passwordError: 'Some Error',
  }),
  [LOGOUT]: (state: IAuthState) => ({
    ...state,
    uiType: IUiType.LOGIN,
    isTokenValid: false,
    isTokenFetching: false,
    isLoading: false,
    user: {},
    isAvailable: false,
  })
}
