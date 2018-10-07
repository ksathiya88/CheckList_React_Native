import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner } from './common';
import LoginForm from './components/loginForm';
import CheckList from './components/checklist';

class App extends Component {
  state = { loggedIn: 'sssss', uid: '' };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAjZsPLU8PGHBctBqdGHRSn__pfwNmhA7E',
      authDomain: 'checklistapp-cd1b7.firebaseapp.com',
      databaseURL: 'https://checklistapp-cd1b7.firebaseio.com',
      projectId: 'checklistapp-cd1b7',
      storageBucket: 'checklistapp-cd1b7.appspot.com',
      messagingSenderId: '921785370927'
    });
 
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, uid: user.uid });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View >
            <Header headerText="Create Checklist" />
            <CheckList uid={this.state.uid} />
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
