import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { checkListUpdate } from '../actions';
import { CardSection, Input } from '../common';

class CheckList extends Component {
    static navigationOptions = {
        headerTitle: 'Create CheckList',
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
                        value={this.props.title}
                        onChangeText={value =>
                            this.props.checkListUpdate({ prop: 'title', value })
                        }
                    />
                </CardSection>
                {this.props.items.map((item, index) => (
                    <CardSection>
                        <Input
                            placeholder="CheckList Item"
                            value={item}
                            onChangeText={text =>
                                this.props.checkListItemUpdate({
                                    prop: text,
                                    index,
                                })
                            }
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

class CheckListForm extends Component {
    render() {
        console.log('props--form', this.props);
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value =>
                            this.props.checkListUpdate({ prop: 'name', value })
                        }
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value =>
                            this.props.checkListUpdate({ prop: 'phone', value })
                        }
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.shift}
                        onValueChange={value =>
                            this.props.checkListUpdate({ prop: 'shift', value })
                        }
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
    },
};

const mapStateToProps = state => {
    const { name, phone, shift } = state.checkListForm;

    return { name, phone, shift };
};

export default connect(
    mapStateToProps,
    { checkListUpdate }
)(CheckListForm);
