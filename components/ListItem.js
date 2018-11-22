import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {CardSection,Card} from "../common";
import {ListButton} from "../common/ListButton";

class ListItem extends Component {
    onRowPress() {
        console.log('Row Press');
        if (this.props.selectedOption === 'USE') {
            console.log('Use ---');
            Actions.checklistUse({
                checklist: this.props.checklist,
            });
        } else {
            console.log('Edit ---');
            Actions.checklistEdit({
                checklist: this.props.checklist,
            });
        }
    }

    render() {
        console.log('list Item', this.props);
        const { title } = this.props.checklist;

        return (
            <Card>
            <CardSection>
                <ListButton onPress={this.onRowPress.bind(this)}>
                    <Text> {title} </Text>
                </ListButton>
            </CardSection>
            </Card>
            // <CardSection>
            // <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
            //     <View style={styles.containerStyle}>
            //         <Text style={styles.titleStyle}>{title}</Text>
            //     </View>
            // </TouchableWithoutFeedback>
            // </CardSection>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        fontWeight: '600',
    },
    containerStyle: {
        justifyContent: 'center',
        backgroundColor: '#ffffcc',
        borderRadius: 5,
        borderWidth: 1,
        padding: 7,
        borderColor: '#007aff',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        position: 'relative',
    },
    textStyle: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#281fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

const mapStateToProps = state => {
    const { selectedOption } = state.radio;
    return { selectedOption };
};

export default connect(
    mapStateToProps,
    null
)(ListItem);
