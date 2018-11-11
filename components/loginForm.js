import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { setUser, setPassword, loginUser } from '../actions/AuthActions';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.setUser(text);
    }

    onPasswordChange(text) {
        this.props.setPassword(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        console.log('Email', email, password);
        this.props.loginUser(email, password);
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
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

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(
    mapStateToProps,
    {
        setUser,
        setPassword,
        loginUser,
    }
)(LoginForm);
