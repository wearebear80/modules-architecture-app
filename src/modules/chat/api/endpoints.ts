import config from 'config'
import { IGetMessagesArgs } from './index'

const { host } = config

export default {
  GET_MESSAGES: ({
    id,
  }: IGetMessagesArgs): string => `${host}?id=${id}`,
  CHAT_API: () => `${host}/some/example/url`,
}
