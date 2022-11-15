import { fork } from 'redux-saga/effects'
import SlotSaga from './SlotSaga'

export default function * sagas() {
  yield fork(SlotSaga().watcher)
}