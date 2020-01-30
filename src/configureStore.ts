import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { apiMiddleware } from 'redux-api-middleware'
import createSagaMiddleware from 'redux-saga'
import { History } from 'history'
import reducers from './reducers'
import sagas from '../middlewares/saga'
import { authTokenMiddleware, timeZoneMiddleware } from '../middlewares'

// @TODO почему то не работает глобальный declare в react-app-env
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    io: any // @TODO
  }
}

export default (history: History) => {
  const sagaMiddleware = createSagaMiddleware()

  let middlewares: any = [ // @TODO maybe we need types here
    authTokenMiddleware,
    apiMiddleware,
    routerMiddleware(history),
    timeZoneMiddleware, // @TODO провести анализ и удалить
    axiosMiddleware(axios),
    sagaMiddleware
  ]

  middlewares = applyMiddleware(...middlewares)

  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    middlewares = composeEnhancers(middlewares)
  }

  const store = createStore(
    reducers(history),
    middlewares,
  )

  sagaMiddleware.run(sagas)

  return store
};
