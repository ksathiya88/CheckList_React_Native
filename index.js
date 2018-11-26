/** @format */

import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
import Router from './Router';

class Index extends Component {


    render() {
        const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('checklist', () => Index);
