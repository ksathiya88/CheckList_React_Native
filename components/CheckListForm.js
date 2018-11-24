import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
                {/*<View style={styles.containerStyle}>*/}
                    <Input
                        placeholder="CheckList Title"
                        value={this.props.title}
                        onChangeText={value =>
                            this.props.checkListUpdate({ prop: 'title', value })
                        }
                    />
                </CardSection>
                {/*</View>*/}
                {this.props.items.map((item, index) => (
                    <View style={styles.itemStyle}>
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
                    </View>
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
    containerStyle: {
        justifyContent: 'center',
        backgroundColor: '#33ccff',
        borderRadius: 5,
        borderWidth: 1,
        padding: 7,
        borderColor: '#007aff',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        position: 'relative',
    },
    itemStyle: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        padding: 7,
        borderColor: '#007aff',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        position: 'relative',
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
