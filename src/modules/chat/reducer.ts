import { handleActions, createAction } from 'redux-actions'
import { apiHandlers } from './api/reducer'
import { IChatState, IChatMessage } from './types'

export const initialState: IChatState = {
  recipientId: '',
  userId: '',
  loading: false,
  messages: []
}

export const SET = 'chat/SET'
export const ADD_NEW_MESSAGE = 'chat/ADD_NEW_MESSAGE'
export const RESET = 'chat/RESET'

export const addNewMessage = createAction<IChatMessage>(ADD_NEW_MESSAGE)

const handlers = {
  [RESET]: (): IChatState => initialState,
  [SET]: (state: any, { payload: { k, v } }: { payload: { k: string, v: any } }): IChatState => ({
    ...state,
    [k]: v
  }),
  [ADD_NEW_MESSAGE]: (state: any, { payload }: { payload: any }): IChatState => ({
    // ...some logic here
    ...state
  }),
}

export default handleActions({
  ...handlers,
  ...apiHandlers,
}, initialState)