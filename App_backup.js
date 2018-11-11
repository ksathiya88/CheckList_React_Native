import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import firebase from 'firebase';
import { connect } from 'react-redux';

import { Card, CardSection, Button } from './common';
//import CheckList from './components/checklist';

class App extends Component {
    // static navigationOptions = {
    //   headerTitle: 'Home',
    // };

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

    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       //this.setState({ loggedIn: true, uid: user.uid });
    //     } else {
    //       //this.setState({ loggedIn: false });
    //     }
    //   });
    // }

    // createCheckList() {

    // }

    renderContent() {
        console.log('Reached login', this.props.loggedIn);
        console.log('Props', this.props);
        // debugger;

        return (
            <View>
                <Card>
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            <Text> logout </Text>
                        </Button>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        {/* <Button
                              onPress={() =>
                                this.props.navigation.navigate('Create_CheckList', { uid: this.state.uid })}
                            ><Text>Create CheckList</Text></Button> */}
                        <Text> Create CheckList </Text>
                    </CardSection>
                </Card>
            </View>
        );
    }

    onButtonPress() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log('logout successfull');
                });
    }

    render() {
        console.log('heellloooooo1111', this.props);
        console.log('heellloooooo2222');
        //this.retrieveCards();
        // firebase.database().ref('User' + this.state.uid + '/').once('value').then((snapshot) => {
        //   //     // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        //   debugger;
        //   console.log("data_got", JSON.stringify(snapshot));
        //   let ddd = JSON.stringify(snapshot);
        //   let ddd11 = JSON.stringify(snapshot.val());
        //   let ddd3333 = JSON.stringify(snapshot.val());
        // });

        return <View> {this.renderContent()} </View>;
    }
}

// const App = createStackNavigator({
//   Home: { screen: Home },
//   // Create_CheckList: { screen: CheckList },
// });

const mapStateToProps = function({
    email,
    password,
    error,
    loading,
    loggedIn,
}) {
    console.log('State', email, password, error, loading, loggedIn);
    return {
        email,
        password,
        error,
        loading,
        loggedIn,
    };
};

export default connect(
    mapStateToProps,
    null
)(App);
