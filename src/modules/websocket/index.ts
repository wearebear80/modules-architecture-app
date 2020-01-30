import LaravelEcho from 'laravel-echo'
import { createAction } from 'redux-actions'
import io from 'socket.io-client'
import config from 'config'
import { Dispatch } from 'redux'
import { IChatMessage } from './types'

export const NEW_CHAT_MESSAGE = 'websocket/NEW_CHAT_MESSAGE'

window.io = io

let Echo: LaravelEcho | null = null

interface IOpenSocketProps {
  token: string
  dispatch: Dispatch
}

const openSocket = ({
  token, dispatch
}: IOpenSocketProps) => {
  if (!Echo) {
    Echo = new LaravelEcho({
      broadcaster: 'socket.io',
      host: config.websocket,
      auth: {
        headers: { Authorization: `Bearer ${token}` }
      },
      transports: ['websocket'],
    })

    Echo.private(`chat`).listen('.chatMessageNew', (newMessageData: IChatMessage) => {
      dispatch({
        type: NEW_CHAT_MESSAGE,
        payload: newMessageData
      })
    })
  }
}

const closeSocket = () => {
  if (Echo) {
    console.log('B-bye ws!') 
    Echo.disconnect()
    Echo = null
  }
}

const getSocket = () => Echo

export default {
  openSocket,
  closeSocket,
  getSocket,
}
