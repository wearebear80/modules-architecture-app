import { getToken } from 'migrating/helpers/token'
import endpoints from './endpoints' 

interface ISendMessageArgs {
  text: string,
  id: string
}

export interface IGetMessagesArgs {
  id: string
}

export default {
  getMessages: ({
    id
  }: IGetMessagesArgs) => ({
    request: {
      method: 'GET',
      url: endpoints.GET_MESSAGES({ id }),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${getToken()}`,
      },
    }
  }),
  sendMessage: ({ id, text }: ISendMessageArgs) => ({
    request: {
      method: 'POST',
      url: endpoints.CHAT_API,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${getToken()}`,
      },
      data: { 
        id,
        text,
      }
    }
  }),
}
