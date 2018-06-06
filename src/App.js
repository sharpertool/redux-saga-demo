import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppComponent from './components/app'
import {connect} from "react-redux";

import * as actions from './actions'

class App extends Component {
    render() {
        const {dispatch} = this.props
        
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Saga Demo</h1>
                </header>
                <AppComponent
                    start={() =>
                        dispatch({
                            type: actions.START
                        })
                    }
                    stop={() =>
                        dispatch({
                            type: actions.STOP
                        })
                    }
                    clear={payload =>
                        dispatch({
                            type: actions.CLEAR_BOARD,
                            payload
                        })
                    }
                    generate={payload =>
                        dispatch({
                            type: actions.GENERATE_BOARD,
                            payload
                        })
                    }
                    changeSize={payload =>
                        dispatch({
                            type: actions.CHANGE_SIZE,
                            payload
                        })
                    }
                    changeSpeed={payload =>
                        dispatch({
                            type: actions.CHANGE_SPEED,
                            payload
                        })
                    }
                    onTick={() =>
                        dispatch({
                            type: actions.TICK
                        })
                    }
                    onCellClick={payload =>
                        dispatch({
                            type: actions.ON_CELL_CLICK,
                            payload
                        })
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
