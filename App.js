import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';


import { Card, CardSection, Input, Button, Spinner } from './common';
import LoginForm from './components/loginForm';
import CheckList from './components/checklist';

class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
  };


  // retrieveCards() {
  //   // const newRef = firebase.database().ref('User' + this.state.uid + '/');
  //   // newRef.limitToFirst(100);
  //   console.log("heellloooooo2222");
  //   return firebase.database().ref('User' + this.state.uid + '/').once('value').then(function(snapshot) {
  //     // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //     console.log("data_got",JSON.stringify(snapshot));
  //     debugger;
  //   //   {this.snapshot.items.map((item, index) =>
  //   //     <CardSection>
  //   //         <Input
  //   //             placeholder="CheckList Item"
  //   //             value={item}
  //   //             onChangeText={(text) => this.handleItem(text, index)}
  //   //         />
  //   //     </CardSection>
  //   // )
  //   // }

  //   }
  // }

  state = {
    loggedIn: 'sssss',
    uid: '',
    createCheckList: false,
    checklist: [{ title: '', index: '', items: [] }]
  };

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

  createCheckList() {

  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View >
            <Card>
              <CardSection>
                <Button
                  onPress={() =>
                    this.props.navigation.navigate('Create_CheckList', { uid: this.state.uid })}
                ><Text>Create CheckList</Text></Button>
              </CardSection>
            </Card>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    console.log('heellloooooo1111');
    console.log("heellloooooo2222");
    //this.retrieveCards();
    firebase.database().ref('User' + this.state.uid + '/').once('value').then((snapshot) => {
      //     // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      debugger;
      console.log("data_got", JSON.stringify(snapshot));
      let ddd = JSON.stringify(snapshot);
      let ddd11 = JSON.stringify(snapshot.val());
      let ddd3333 = JSON.stringify(snapshot.val());
    });

    return (
      <View>
        {/* {this.renderContent()} */}
      </View>
    );
  }
}

const App = createStackNavigator({
  Home: { screen: Home },
  Create_CheckList: { screen: CheckList },
});

export default App;
