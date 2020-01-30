import { createAction, Action } from 'redux-actions'
import api from './index'
import { SUCCESS, FAIL } from 'migrating/helpers/redux'
import {
  IChatState,
} from '../types'

export interface IPayloadRequest {
  request: Function
}

export const GET_MESSAGES = 'chat/api/GET_MESSAGES'
export const SEND_MESSAGE = 'chat/api/SEND_MESSAGE'

// @ts-ignore
export const getMessages = createAction<IPayloadRequest>(GET_MESSAGES, api.getMessages)
// @ts-ignore
export const sendMessage = createAction<IPayloadRequest>(SEND_MESSAGE, api.sendMessage)

export const apiHandlers = {
  [GET_MESSAGES]: (state: IChatState, { payload }: any) => ({
    ...state,
    loading: true,
    isUpdating: payload.isUpdating
  }),
  [SUCCESS(GET_MESSAGES)]: (state: IChatState) => {
    // ...some logic here
    return state
  },
  [FAIL(GET_MESSAGES)]: (state: IChatState) => ({ // @TODO добавить обработку ошибок
    ...state,
    loading: false,
  }),
  [SUCCESS(SEND_MESSAGE)]: (state: IChatState) => {
    // ...some logic here
    return state
  }
}