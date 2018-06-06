import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";

import Button from './components/button'
import Quotes from './components/quotes'
import Errors from './components/errors'
import * as actions from './actions';

class App extends Component {
    
    updateQuote = () => this.props.dispatch(actions.updateQuote())
    clearQuotes = () => this.props.dispatch(actions.clearQuotes())
    clearErrors = () => this.props.dispatch(actions.clearErrors())

    setLang = () => {
        const l = this.props.language == 'en' ? 'ru': 'en'
        this.props.dispatch(actions.setLanguage(l))
    }
    
    render() {
        const {quotes, language, errors} = this.props;
        const langNames = {'en': 'English', 'ru': 'Russian'}
        const has_errors = this.props.errors.length > 0
        
        return (
            <div>
                <h1>Sagas Demo</h1>
                
                <div>
                    <h3>Quotes in { langNames[language] }
                    </h3>
                    <Button onClick={this.setLang}>Toggle Language</Button>
                    
                </div>
                <Button
                    onClick={this.updateQuote}
                    className={'button'}
                >
                    Get Quote
                </Button>
                <Button
                    onClick={this.clearQuotes}
                    className={'button'}
                >
                    Clear Quotes
                </Button>
                <Button
                    onClick={this.clearErrors}
                    className={'button'}
                    enabled={has_errors}
                >
                    Clear Errors
                </Button>
                <Quotes quotes={quotes}></Quotes>
                <Errors errors={errors}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(App);
