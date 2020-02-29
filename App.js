import React, { Component } from "react";
import {Provider} from 'react-redux';
import FSDemoApp from './FSDemoApp';
import store from './Store';

export default class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <FSDemoApp/>
            </Provider>
        );
    }
}


