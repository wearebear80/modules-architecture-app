import { 
  NEW_CHAT_MESSAGE,
} from './websocket/actions'
import chatAdapterSaga from './chat/adapterSaga'

const sagas = {
  ...chatAdapterSaga({
    NEW_CHAT_MESSAGE,
  }),
}

export default function* watchModulesSagas() {
  const sagasArray = R.values(sagas)
  yield all(sagasArray.map(saga => fork(saga)))
}