import React, { Component } from "react";
import {Provider} from 'react-redux';
import store from './Store';
import FSDemoAppNav from "./FSDemoAppNav";
//import FSDemoApp from './FSDemoApp';

export default class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <FSDemoAppNav/>
            </Provider>
        );
    }
}


