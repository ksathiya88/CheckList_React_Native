import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {
    checkListUpdate,
    checkListItemsUpdate,
    checkListAddItems,
} from '../actions';
import { CardSection, Input, Button, Card } from '../common';

class CheckListForm extends Component {
    render() {
        //console.log('checklistForm--props', this.props);
        return (
            <Card>
                <CardSection>
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
                            value={item.value}
                            onChangeText={text =>
                                this.props.checkListItemsUpdate({
                                    prop: text,
                                    index,
                                })
                            }
                        />
                    </CardSection>
                ))}
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
};

const mapStateToProps = state => {
    const { title, items } = state.checkListForm;

    return { title, items };
};

export default connect(
    mapStateToProps,
    { checkListUpdate, checkListItemsUpdate, checkListAddItems }
)(CheckListForm);
