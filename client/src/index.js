import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import './index.css';
import Counter from './components/counter/Counter';

import registerServiceWorker from './registerServiceWorker';

// Redux reducer function; takes state, then based on an action, creates a new state and returns it
const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// Create a redux store passing it the reducer function
const store = createStore(reducer)

class Site extends Component {
    
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path='/counter' render={() => <Counter 
                                                                    state ={this.props.state}
                                                                    onIncrement={() => {
                                                                        store.dispatch({
                                                                            type: 'INCREMENT'
                                                                        })
                                                                    }}
                                                                    onDecrement={() => {
                                                                        store.dispatch({
                                                                            type: 'DECREMENT'
                                                                        })
                                                                    }}/>} />
                </Switch>
            </Router>
        )
    }
}

const render = () => {
    ReactDOM.render(<Site state = {store.getState()}/>, document.getElementById('root'));
}

registerServiceWorker();

store.subscribe(render);
render();