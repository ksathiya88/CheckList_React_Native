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
        />);
    }

    textInput(item, index) {
        let errorValue;
        if (this.props.error !== '' && item.value === '') {

            errorValue = true;
        } else {
            errorValue = false;
        }
        return ( <View style={styles.itemStyle}>
            <Input
                placeholder="CheckList Item"
                value={item.value}
                onError={errorValue}
                onChangeText={text =>
                    this.props.checkListItemsUpdate({
                        prop: text,
                        index,
                    })
                }
            />
        </View>);
    }

    rowData(item,index){
        return (<Swipeout right={[{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {
                this.props.checkListItemDelete(index,this.props.checklist);
            } }]}>
            <CardSection>
                {this.textInput(item, index)}
            </CardSection>
        </Swipeout>);

    }


    render() {
        //console.log('checklistForm--props', this.props);
        return (
            <Card>
                <CardSection>
                {/*<View style={styles.containerStyle}>*/}
                    {this.textTitle()}
                </CardSection>
                {/*</View>*/}
                {this.props.items.map((item, index) =>
                    this.textInput(item, index)
                )}
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                <CardSection>
                    <Button onPress={() => this.props.checkListAddItems(this.props)}>
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
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
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
    const { title, items, error } = state.checkListForm;

    return { title, items, error };
};

export default connect(
    mapStateToProps,
    { checkListUpdate, checkListItemsUpdate, checkListAddItems }
)(CheckListForm);
