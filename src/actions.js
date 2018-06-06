// 🤙 ACTIONS
export const UPDATE_QUOTE = "UPDATE_QUOTE"
export const UPDATE_SUCCESS = "UPDATE_SUCCESS"
export const UPDATE_FAILED = "UPDATE_FAILED"
export const ADD_QUOTE = "ADD_QUOTE"

export const CLEAR_QUOTES = "CLEAR_QUOTES"
export const CLEAR_ERRORS = "CLEAR_ERRORS"

export const SET_LANG = "SET_LANG"
export const INVALID_LANG = "INVALID_LANG"

export const CHANGE_SPEED = "CHANGE_SPEED"
export const TICK = "TICK"
export const START = "START"
export const STOP = "STOP"

export const updateQuote = () => {
    console.log('New Quote Action Generator')
    return {type: UPDATE_QUOTE}
}

export const updateQuoteSuccess = (quote) => {
    return {type: UPDATE_SUCCESS, payload: quote}
}

export const clearQuotes= () => {return {type:CLEAR_QUOTES}}
export const clearErrors = () => {return {type:CLEAR_ERRORS}}

export const setLanguage = (lang='en') => {
    const langs = new Set(['en','ru'])
    if (!langs.has(lang)) {
        return {type: INVALID_LANG, payload: lang}
    }
    return {type: SET_LANG, payload: lang}
}

export const addQuote = (quote) => {
    return {type: ADD_QUOTE, payload: quote}
}