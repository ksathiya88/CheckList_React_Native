import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {connect} from 'react-redux';
import {setUser, setPassword, loginUser, updateIndex, registerUser, closeModal} from '../actions/AuthActions';
import {Card, CardSection, Input, Spinner} from '../common';
import {DisplayModal} from "../common/DisplayModal";

class LoginForm extends Component {

    updateIndex(selectedIndex) {
        if (this.props.selectedIndex == selectedIndex) {
            const {email, password} = this.props;
            // login
            if (selectedIndex === 0) {

                console.log('Email_update_index ', email, password);
                this.props.loginUser(email, password);
                // register
            } else {
                this.props.registerUser(email, password);
            }

        } else {
            console.log("updateIndex", selectedIndex);
            this.props.updateIndex(selectedIndex);
        }
    }

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

    moveToRegister() {
        const {email, password} = this.props;
        console.log('Email', email, password);
        this.props.moveToRegister();
    }

    onAccept() {
        console.log("close Modal");
        this.props.closeModal();
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }

        return (<ButtonGroup
                onPress={this.updateIndex.bind(this)}
                selectedIndex={this.props.selectedIndex}
                containerStyle={{borderRadius: 7}}
                containerBorderRadius={20}
                buttons={["LOGIN", "REGISTER"]}
            />
        );
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

                <DisplayModal
                    visible={this.props.displayModal}
                    onAccept={this.onAccept.bind(this)}
                >
                    Registration Succeded.Please login
                </DisplayModal>
                {this.renderButton()}
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
    const {email, password, error, loading, selectedIndex, displayModal} = auth;
    return {email, password, error, loading, selectedIndex, displayModal};
};

export default connect(
    mapStateToProps,
    {
        setUser,
        setPassword,
        loginUser,
        updateIndex,
        registerUser,
        closeModal
    }
)(LoginForm);
