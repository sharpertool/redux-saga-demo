// ✨ SAGAS
import {eventChannel} from 'redux-saga';
import {
    takeEvery,
    put,
    call,
    select,
} from 'redux-saga/effects';

import * as actions from './actions';
import * as api from './api'
import {getLang} from './selectors';

const randomFailure = (pct) => {
    return Math.floor(Math.random() * 100) > Math.floor(pct)
}

function* update_quote() {
    try {
        if (randomFailure(15)) {
            throw Error('Randomly generated error!')
        } else {
            const lang = yield select(getLang)
            const quote = yield call(api.fetch_quote, lang)
            yield put(actions.updateQuoteSuccess(quote))
        }
    } catch (error) {
        yield put(actions.updateQuoteFailure(error))
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.UPDATE_QUOTE, update_quote);
}
