export enum IUiType {
  LOGIN,
  PASSWORD,
  AUTHORIZED,
  HIDDEN,
}

export interface IAuthUser {
  active: boolean
  avatar: string
  created_at: string
  date_of_birth?: string | null
  email: string
  full_name: string
  id: number
  token: string
}

export interface IAuthState {
  login: string
  loginError: string
  password: string
  passwordError: string
  isTokenFetching: boolean
  isTokenValid: boolean
  isLoading: boolean
  user: IAuthUser | Object
  uiType: IUiType
}

export interface IAuthAction<T, P> {
  type: T
  payload: P
}