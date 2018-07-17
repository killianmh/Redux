import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';

class Counter extends Component {
    render(){
        return(
            <div>
                <h1>{this.props.state}</h1>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
            </div>
        )
    }
}

export default Counter;