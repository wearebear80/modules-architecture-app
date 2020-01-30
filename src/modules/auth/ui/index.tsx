import React, { Fragment, FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router'
import { IState } from 'reducers'
import { SET_UI_TYPE } from 'modules/auth/reducer'
import { IUiType, IAuthState } from 'modules/auth/types'
import { Spinner } from 'components'
import * as s from './styles'

interface IAuthModuleUiProps {
  defaultUiType?: IUiType
}

interface IAuthModuleUiState {
  isLoading: keyof IAuthState
  uiType: IUiType,
  isTokenValid: keyof IAuthState
  isTokenFetching: keyof IAuthState
  pathname: string
}

const AuthModuleUi: FunctionComponent<IAuthModuleUiProps> = ({ defaultUiType }: IAuthModuleUiProps) => {
  const { pathname }: IAuthModuleUiState = useSelector((state: any) => state.router.location)
  const { isLoading, uiType, isTokenFetching }: IAuthModuleUiState = useSelector((state: IState) => state.auth)
  let currentUiType = defaultUiType || uiType
  const dispatch = useDispatch()

  function handleGoBack() {
    dispatch({ type: SET_UI_TYPE, payload: IUiType.LOGIN })
  }

  if (isTokenFetching) {
    return <Fragment />
  }

  if (isLoading) {
    return <Fragment />
  }

  // some ui here
  switch (currentUiType) {
    case IUiType.LOGIN:
      return <Fragment />
    case IUiType.PASSWORD:
      return <Fragment />
    case IUiType.AUTHORIZED:
      return <Fragment />
    case IUiType.HIDDEN:
      return <Fragment />
    default:
      return <Fragment />
  }
}

export default AuthModuleUi