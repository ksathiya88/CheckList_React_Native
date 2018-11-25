/** @format */

import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducer from './reducers';
import Router from './Router';

class Index extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAjZsPLU8PGHBctBqdGHRSn__pfwNmhA7E',
            authDomain: 'checklistapp-cd1b7.firebaseapp.com',
            databaseURL: 'https://checklistapp-cd1b7.firebaseio.com',
            projectId: 'checklistapp-cd1b7',
            storageBucket: 'checklistapp-cd1b7.appspot.com',
            messagingSenderId: '921785370927',
        });
    }

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
