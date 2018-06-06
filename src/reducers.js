import {combineReducers} from 'redux';

import * as actions from './actions';

const test_quotes = [
    {
        "quoteText": "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared. ",
        "quoteAuthor": "Buddha",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/en/129f575218/"
    },
    {
        "quoteText": "You need chaos in your soul to give birth to a dancing star. ",
        "quoteAuthor": "Nietzsche",
        "senderName": "",
        "senderLink": "",
        "quoteLink": "http://forismatic.com/en/63c395aea2/"
    }
]

// 🌴 REDUCERS
const initialState = {
    quotes: test_quotes,
    isfetching: false,
    errors: [],
    language: 'en'
};

const quotes = (state = initialState.quotes, {type, payload}) => {
    switch (type) {
        case actions.CLEAR_QUOTES:
            return []
        case actions.ADD_QUOTE:
        case actions.UPDATE_SUCCESS:
            return [...state, payload]
        default:
            return state;
    }
};

const isfetching = (state = initialState.isfetching, {type}) => {
    switch (type) {
        case actions.UPDATE_QUOTE:
            return true;
        case actions.UPDATE_SUCCESS:
        case actions.UPDATE_FAILED:
            return false;
        default:
            return state;
    }
};

const errors = (state = initialState.errors, {type, payload}) => {
    switch (type) {
        case actions.CLEAR_ERRORS:
            return [];
        case actions.UPDATE_FAILED:
            return [...state, payload];
        default:
            return state;
    }
};

const language = (state = initialState.language, {type, payload}) => {
    switch (type) {
        case actions.SET_LANG:
            return payload;
        default:
            return state;
    }
};
export default combineReducers({
    quotes,
    isfetching,
    errors,
    language
});
