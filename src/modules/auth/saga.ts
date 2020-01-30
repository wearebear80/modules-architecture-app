import { takeEvery, put, call, delay } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { SUCCESS } from 'migrating/helpers/redux'
import { removeToken } from 'migrating/helpers/token'
import { push } from 'connected-react-router'
import {
  AUTH,
  LOGOUT,
  setAvailability,
  checkAvailability,
  sendFirebaseToken,
  removeFirebaseToken,
} from './api/reducer'
import { askForPermissionToReceiveNotifications } from 'migrating/firebaseConfig'

function* authSuccessHandler(action: Action<any>) {
  try {
    yield put(push('/v2'))
    yield sendFirstAvailability(action)
    yield addFirebaseListener()
  } catch (err) {
    console.log('ERR authSuccessHandler', err)
  }
}

function* logoutSuccessHandler(action: Action<any>) {
  try {
    yield removeFirebaseListener()
    removeToken()
  } catch (err) {
    console.log('ERR logoutSuccessHandler', err)
  }
}

// @TODO вынести в useEffect
function* sendFirstAvailability(action: Action<any>) {
  try {
    const doctorId = action.payload.data.data.id

    yield put(setAvailability({ isAvailable: true, doctorId }))
    yield put(checkAvailability(doctorId))

  } catch (err) {
    console.log('ERR sendFirstAvailability', err)
  }
}

// @TODO вынести все что связано с firebase в отдельный модуль
function* addFirebaseListener() {
  try {
    const fbToken = yield call(askForPermissionToReceiveNotifications)

    yield put(sendFirebaseToken(fbToken))
  } catch (err) {
    console.log('ERR addFirebaseListener', err)
  }
}

// @TODO вынести все что связано с firebase в отдельный модуль
export function* removeFirebaseListener() {
  try {
    const fbToken = yield call(askForPermissionToReceiveNotifications)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister()
        }
      })
    }
    yield put(removeFirebaseToken(fbToken))
  } catch (err) {
    console.log('ERR removeFirebaseListener', err)
  }
}

export default function* watch() {
  yield takeEvery(SUCCESS(AUTH), authSuccessHandler)
  yield takeEvery(SUCCESS(LOGOUT), logoutSuccessHandler)
}
