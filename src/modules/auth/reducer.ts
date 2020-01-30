import { handleActions } from 'redux-actions'
import { apiHandlers } from './api/reducer'
import {
  IUiType,
  IAuthState,
} from './types'

export const SET_LOGIN = 'auth/SET_LOGIN'
export const SET_PASSWORD = 'auth/SET_PASSWORD'
export const SET_UI_TYPE = 'auth/SET_UI_TYPE'

type IAuthActionType = typeof SET_LOGIN | typeof SET_PASSWORD | typeof SET_UI_TYPE

export const initialState = {
  uiType: IUiType.LOGIN,
  login: '',
  loginError: '',
  password: '',
  passwordError: '',
  isTokenValid: false,
  isTokenFetching: true,
  isLoading: false,
  user: {},
}

// @TODO разделить reducer на api и offline данные
const handlers = {
  [SET_UI_TYPE]: (state: IAuthState, { payload }: { payload: IUiType }): IAuthState => ({
    ...state,
    uiType: payload
  }),
  [SET_LOGIN]: (state: IAuthState, { payload }: any): IAuthState => ({ // @TODO types
    ...state,
    login: payload,
    loginError: ''
  }),
  [SET_PASSWORD]: (state: IAuthState, { payload }: any ): IAuthState => ({
    ...state,
    password: payload
  }),
}

export default handleActions({ ...handlers, ...apiHandlers }, initialState)