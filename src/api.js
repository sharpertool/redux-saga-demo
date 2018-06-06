import axios from 'axios';
import fetchJsonp from 'fetch-jsonp'

export function myfetch(url) {
    
    let headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
    
    return fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        mode: 'cors',
        headers: headers,
        dataType: "jsonp"
    }).then(res => {
        console.log(`response status: ${res.ok}`);
        if (!res.ok) {
            console.log(`Error: ${res.statusText}`);
            const error = new Error(res.statusText);
            error.response = res;
            throw error;
        }
        return res.json();
    });
}

export function fetch_quote(lang='en') {
    const uri = `https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=${lang}`;
    
    let headers = new Headers({
        'Accept': 'application/json'
    });
    
    function callback(args) {
        console.log('you rang?')
    }
    
    console.log('Making api request')
    return fetchJsonp(uri, {
        jsonpCallback: 'jsonp'
    }).then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
            return;
        }
        return res.json();
    })
}

