import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Input, Button } from '../common';

class CheckList extends Component {
    static navigationOptions = {
        headerTitle: 'Create CheckList',
    };

    state = {
        title: '',
        items: [''],
    };
    handleTitle = text => {
        this.setState({ title: text });
    };

    handleItem = (text, index) => {
        const items = [...this.state.items];
        items[index] = text;
        this.setState({ items });
    };

    addItem = () => {
        const items = [...this.state.items];
        items.push('');
        this.setState({ items });
    };

    addChecklist = () => {
        const newRef = firebase
            .database()
            .ref('User' + this.props.navigation.getParam('uid') + '/')
            .push();
        newRef
            .set(this.state)
            .then(data => {
                //success callback
                console.log('data ', data);
                this.props.navigation.goBack();
            })
            .catch(error => {
                //error callback
                console.log('error ', error);
            });
    };

    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={() => this.logout()}>
                        <Text> Logout </Text>
                    </Button>
                    <Input
                        placeholder="CheckList Title"
                        onChangeText={this.handleTitle}
                    />
                </CardSection>
                {this.state.items.map((item, index) => (
                    <CardSection>
                        <Input
                            placeholder="CheckList Item"
                            value={item}
                            onChangeText={text => this.handleItem(text, index)}
                        />
                    </CardSection>
                ))}
                <CardSection>
                    <Button onPress={() => this.addItem()}>
                        <Text> Add </Text>
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => this.addChecklist()}>
                        <Text> Submit </Text>
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default CheckList;