export interface IChatState {
  recipientId: string
  userId: string
  loading: boolean
  messages: IChatMessage[]
}

export interface IChatMessage {
  id?: string | number
  text: string
}