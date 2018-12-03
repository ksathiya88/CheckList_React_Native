import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, TextInput} from 'react-native';
import {CheckBox, Badge} from 'react-native-elements';
import {CardSection, Input, Card, Button} from '../common';
import {
    checkListUpdate,
    checkListCheckedUpdate,
    checkListSave,
    checkListReset,
    checkListItemsUpdate,
    checkListAddItems,
    checkListItemOnBlur,
    makeAutoSaveFalse,
    checkListItemOnBlurTitle
} from '../actions';


class CheckListUse extends Component {
    componentWillMount() {
        console.log('checklist use', this.props.checklist);
        this.props.checkListUpdate({
            prop: 'title',
            value: this.props.checklist.title,
        });

        this.props.checkListUpdate({
            prop: 'items',
            value: this.props.checklist.items,
        });
    }

    onButtonPress() {
        console.log('Button press checklist use');
        const {title, items} = this.props;

        this.props.checkListSave({
            title,
            items,
            uid: this.props.checklist.uid,
        });
    }

    onResetPress() {
        //console.log('Reset press checklist use', items);
        const {items} = this.props;
        console.log('Reset press checklist use', items);
        for (let i = 0; i < items.length; i++) {
            console.log('items ', items[i]);
            if (items[i]) {
                items[i].checked = false;
            }
        }

        this.props.checkListReset({
            items,
            uid: this.props.checklist.uid,
        });
    }

    autoSave() {
        if (this.props.autoSave) {
            console.log("Autosave true");
            setTimeout(() => {
                this.props.makeAutoSaveFalse();
            }, 3000);
            return <Badge containerStyle={{backgroundColor: 'violet'}}>
                <Text>Auto Saved.</Text>
            </Badge>
        }
    }

    textTitle() {
        let errorValue;
        if (this.props.error !== '' && this.props.title === '') {
            console.log("Error title");
            errorValue = true;
        } else {
            console.log("No Error");
            errorValue = false;
        }
        return (<Input
            placeholder="CheckList Title"
            value={this.props.title}
            onError={errorValue}
            onChangeText={value =>
                this.props.checkListUpdate({prop: 'title', value})
            }
            onBlur={() =>
                this.props.checkListItemOnBlurTitle({
                    prop: 'title',
                    value: this.props.title,
                    uid: this.props.checklist.uid
                })
            }
        />);
    }

    textInput(item, index) {
        let styleInput;
        if (this.props.error !== '' && item.value === '') {

            styleInput = styles.inputErrorStyle;
        } else {
            styleInput = styles.inputStyle;
        }
        return (<TextInput
            placeholder="CheckList Item"
            style={styleInput}
            value={item.value}
            onChangeText={text =>
                this.props.checkListItemsUpdate({
                    prop: text,
                    index,
                    uid: this.props.checklist.uid
                })
            }
            onBlur={() =>
                this.props.checkListItemOnBlur({
                    prop_obj: this.props.items[index],
                    index,
                    uid: this.props.checklist.uid
                })
            }
        />);
    }

    render() {
        console.log('checklistForm--props', this.props);
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onResetPress.bind(this)}>
                        Reset
                    </Button>
                </CardSection>
                <CardSection>
                    {this.textTitle()}
                    {this.autoSave()}

                </CardSection>
                {this.props.items.map((item, index) => (
                    <CardSection>
                        <View style={styles.labelStyle}>
                            <CheckBox
                                title="Done"
                                checked={item.checked}
                                onPress={() => {
                                    this.props.checkListCheckedUpdate({
                                        prop: !this.props.items[index].checked,
                                        index,
                                    });
                                    this.props.checkListItemOnBlur({
                                        prop_obj: this.props.items[index],
                                        index,
                                        uid: this.props.checklist.uid
                                    });
                                }}
                                // onBlur={() =>
                                //     this.props.checkListItemOnBlur({
                                //         prop_obj: this.props.items[index],
                                //         index,
                                //         uid: this.props.checklist.uid
                                //     })
                                // }
                            />

                        </View>
                        {this.textInput(item, index)}

                    </CardSection>
                ))}
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                <CardSection>
                    <Button onPress={() => this.props.checkListAddItems()}>
                        <Text> Add </Text>
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
    },
    labelStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
    },
    inputStyle: {
        color: '#007aff',
        fontSize: 18,
        paddingLeft: 20,
    },
    inputErrorStyle: {
        color: '#007aff',
        fontSize: 18,
        paddingLeft: 20,
        borderColor: "red",
        borderWidth: 3
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    badgeStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleInputError: {
        color: '#007aff',
        fontSize: 18,
        paddingLeft: 20,
        borderColor: "red",
        borderWidth: 3
    },
    containerStyle: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: '#007aff',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'relative',
    },
    inputTitleStyle: {
        color: '#007aff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
};

const mapStateToProps = state => {
    const {title, items, autoSave, error} = state.checkListForm;
    console.log('checklistUse', title, items);
    return {title, items, autoSave, error};
};

export default connect(
    mapStateToProps,
    {
        checkListUpdate, checkListCheckedUpdate, checkListItemOnBlur,
        checkListSave, checkListReset,
        checkListItemsUpdate, checkListAddItems,
        makeAutoSaveFalse, checkListItemOnBlurTitle
    }
)(CheckListUse);
