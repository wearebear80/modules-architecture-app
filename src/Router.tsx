import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { History } from 'history'
import { Authentication, ServerTime } from 'components'
import { useDispatch } from 'react-redux'
import * as scenes from 'scenes'
import serviceWorkerEvents from '../serviceWorkerEvents'
import pages from './pages'
import { IState } from 'reducers'
import { checkToken } from 'migrating/modules/auth/api/reducer'

interface ICustomRouterProps {
  history: History
}

const CustomRouter = ({ history }: ICustomRouterProps) => {
  const dispatch = useDispatch()
  const { isTokenValid } = useSelector((state: IState) => state.auth)

  useEffect(() => {
    console.log('CHECK_TOKEN')
    dispatch(checkToken())
  }, [dispatch])

  if (!isTokenValid) return <pages.AuthPage />

  return (
    <ServerTime>
      <Router history={history}>
        <Switch>
          <Route path="/error" component={scenes.ErrorPage} />
          <Route path="/main" component={pages.MainPage} />
          <Route path="/" component={scenes.HomeScene} />
        </Switch>
      </ Router>
    </ServerTime>
  )
}

export default CustomRouter
