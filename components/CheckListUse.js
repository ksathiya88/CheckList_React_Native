import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { CardSection, Input, Card, Button } from '../common';
import {
    checkListUpdate,
    checkListCheckedUpdate,
    checkListSave,
    checkListReset,
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
        const { title, items } = this.props;

        this.props.checkListSave({
            title,
            items,
            uid: this.props.checklist.uid,
        });
    }

    onResetPress() {
        //console.log('Reset press checklist use', items);
        const { items } = this.props;
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
                    <Input
                        placeholder="CheckList Title"
                        value={this.props.title}
                    />
                </CardSection>
                {this.props.items.map((item, index) => (
                    <CardSection>
                        <CheckBox
                            title="Done"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checked={item.checked}
                            onPress={text => {
                                console.log('checked111', text, index);
                                this.props.checkListCheckedUpdate({
                                    prop: !item.checked,
                                    index,
                                });
                            }}
                        />
                        <Input
                            placeholder="CheckList Item"
                            value={item.value}
                        />
                    </CardSection>
                ))}
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save
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
};

const mapStateToProps = state => {
    const { title, items } = state.checkListForm;
    console.log('checklistUse', title, items);
    return { title, items };
};

export default connect(
    mapStateToProps,
    { checkListUpdate, checkListCheckedUpdate, checkListSave, checkListReset }
)(CheckListUse);
