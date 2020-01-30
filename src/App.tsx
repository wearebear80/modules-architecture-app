import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory, History } from 'history'
import configureStore from './configureStore'
import Router from './Router'
import { createPreserveQueryHistory } from 'migrating/helpers/queryMiddleware'

const history: History = createPreserveQueryHistory(createBrowserHistory, ['id', 'patientId', 'sessionId'])()
const store = configureStore(history)

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history} />
      </ConnectedRouter>
    </Provider>
  }
}

