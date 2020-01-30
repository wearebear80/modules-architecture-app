/* eslint-disable no-shadow */
import { Action } from 'redux-actions'
import { takeEvery, put, } from 'redux-saga/effects'
import { addNewMessage } from './reducer'
import { IChatMessage } from './types'

function* onWebSocketChatNewMessageHandler(action: Action<IChatMessage>) {
  try {
    const { payload } = action
    yield put(addNewMessage(payload))
  } catch (err) {
    console.log('ERR onWebSocketChatNewMessageHandler', err)
  }
}

interface IChatOuterActionTypes {
  NEW_CHAT_MESSAGE: string
}

export default (outerActionTypes: IChatOuterActionTypes) => ({
  onWebSocketChatNewMessage: function* onWebSocketChatNewMessage() {
    yield takeEvery(outerActionTypes.NEW_CHAT_MESSAGE, onWebSocketChatNewMessageHandler)
  },
})