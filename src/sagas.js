// ✨ SAGAS
import {eventChannel} from 'redux-saga';
import {
    take,
    takeEvery,
    put,
    call,
    fork,
    cancel,
    select,
    cancelled,
    race
} from 'redux-saga/effects';

import * as actions from './actions';
import * as api from './api'
import {getActiveSpeed, getLang} from './selectors';

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
            const {tick, update} = yield race({
                tick: take(chan),
                update: take(actions.CHANGE_SPEED)
            });
            if (update) {
                chan.close();
                chan = yield call(timer, update.payload.ms);
            }
            yield put({type: actions.TICK});
        }
    } finally {
        if (yield cancelled) {
            chan.close();
        }
    }
}

function* update_quote() {
    console.log('Get new quote')
    const lang = yield select(getLang)
    const quote = yield call(api.fetch_quote, lang)
    console.log(`Quote received ${JSON.stringify(quote)}`)
    yield put(actions.updateQuoteSuccess(quote))
}

export default function* rootSaga() {
    yield takeEvery(actions.UPDATE_QUOTE, update_quote);

    while (yield take(actions.START)) {
        // starts the task in the background
        const bgSyncTask = yield fork(timerSaga);

        // wait for the user stop action
        const [stop, clear] = yield race([
            take(actions.STOP),
            take(actions.CLEAR_QUOTES)
        ]);
        // user clicked stop. cancel the background task
        // this will throw a SagaCancellationException into task
        yield cancel(bgSyncTask);
    }
}
