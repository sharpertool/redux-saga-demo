// ✨ SAGAS
import { eventChannel } from 'redux-saga'
import {
  take,
  put,
  call,
  fork,
  cancel,
  select,
  cancelled,
  race
} from 'redux-saga/effects'

import * as actions from 'actions'
import {getActiveSpeed} from 'selectors'

// https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md
function timer(ms) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter(ms);
    }, ms);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
      console.log("timer terminated");
    };
  });
}

function* timerSaga() {
  const speed = yield select(getActiveSpeed);
  let chan = yield call(timer, speed);

  try {
    while (true) {
      const { tick, update } = yield race({
        tick: take(chan),
        update: take(actions.CHANGE_SPEED)
      });
      if (update) {
        chan.close();
        chan = yield call(timer, update.payload.ms);
      }
      yield put({ type: TICK });
    }
  } finally {
    if (yield cancelled) {
      chan.close();
    }
  }
}

export function* rootSaga() {
  while (yield take(actions.START)) {
    // starts the task in the background
    const bgSyncTask = yield fork(timerSaga);

    // wait for the user stop action
    const [stop, clear] = yield race([
      take(actions.STOP),
      take(actions.CLEAR_BOARD)
    ]);
    // user clicked stop. cancel the background task
    // this will throw a SagaCancellationException into task
    yield cancel(bgSyncTask);
  }
}
