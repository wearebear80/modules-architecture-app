import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  authModule,
  chatModule,
  wsocketModule,
} from 'modules'
import { IState } from 'reducers'

const AuthModuleUI = authModule.ui
const ChatModuleUI = chatModule.ui

const MainPage = () => {
  const dispatch = useDispatch()
  const { isTokenValid, user } = useSelector((state: IState) => state.auth)

  useEffect(() => {
    if (isTokenValid) {
      // @ts-ignore
      wsocketModule.openSocket({
        userId: user.id,
        token: user.token,
        dispatch,
      })
    }

    return () => wsocketModule.closeSocket()
  }, [isTokenValid])

  return (<>
    <AuthModuleUI />
    <ChatModuleUI />
  </>)
}

export default MainPage
