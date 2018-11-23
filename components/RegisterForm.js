import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {setUser, setPassword, loginUser} from '../actions/AuthActions';
import {Card, CardSection, Input, Button, Spinner} from '../common';

class RegisterForm extends Component {
    onEmailChange(text) {
        this.props.setUser(text);
    }

    onPasswordChange(text) {
        this.props.setPassword(text);
    }

    onButtonPress() {
        const {email, password} = this.props;
        console.log('Email', email, password);
        this.props.loginUser(email, password);
    }


    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }


        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        const { selectedIndex } = this.state;
        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 100}} />
        );

        // return (<View><Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        //     <Button onPress={this.onButtonPress.bind(this)}>Register</Button></View>);
    }

    render() {
        console.log('props', this.props);
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>{this.props.error}</Text>

                <CardSection>{this.renderButton()}</CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
};

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;
    return {email, password, error, loading};
};

export default connect(
    mapStateToProps,
    {
        setUser,
        setPassword,
        loginUser,
    }
)(RegisterForm);
