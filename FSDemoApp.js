import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {store} from './Store';

import LoginViewConnected from './pages/login';
import RegistView from './pages/registration';
import UserHome from './pages/userhome';
import NotFound from './components/NotFound';

//const history = syncHistoryWithStore(browserHistory, store);
const history = browserHistory;

const Routes = () => (
  <Router history={history} IndexRoute="Home">
    <Route path="Home" component={LoginViewConnected} />
    <Route path="Details" component={RegistView} />
    <Route path="UserHome" component={UserHome} />
    <Route path="*" component={NotFound} />
  </Router>
);

class FSDemoApp extends Component {
    render() {
        return (
            <Provider store = {store}>
                <Routes/>
            </Provider>
        );
    }
}

export default FSDemoApp;