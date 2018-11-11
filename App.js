import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import firebase from 'firebase';
import { connect } from 'react-redux';
import { logout } from './actions/AuthActions';

import { Card, CardSection, Button } from './common';
//import CheckList from './components/checklist';

class App extends Component {
    onButtonPress() {
        console.log('heellloooooobutton', this.props);
        this.props.logout();
    }

    render() {
        console.log('heellloooooo1111', this.props);
        console.log('heellloooooo2222');

        return (
            <View>
                <Card>
                    <CardSection>
                        <Button onPress={() => this.props.logout()}>
                            <Text> logout </Text>
                        </Button>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Button>
                            <Text>Create CheckList</Text>
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
        // return <View> {this.renderContent()} </View>;
    }
}

const mapStateToProps = state => {
    console.log('State', state);
    const { email, password, error, loading, loggedIn } = state.auth;
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
    { logout }
)(App);
