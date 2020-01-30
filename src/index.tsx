import 'react-app-polyfill/ie11' // eslint-disable-line
import 'isomorphic-fetch' // eslint-disable-line
import React from 'react'
import ReactDOM from 'react-dom'
import { initializeFirebase } from './migrating/firebaseConfig'
import registerServiceWorker from './migrating/registerServiceWorker'
import App from './migrating/App'
import './assets/main.scss'

const originalError = window.console.error
window.console.error = function () {
	// @ts-ignore
	if (window.newrelic) window.newrelic.noticeError(...arguments)
  originalError.call(null, ...arguments)
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker();
initializeFirebase();
