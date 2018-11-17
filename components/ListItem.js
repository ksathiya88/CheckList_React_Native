import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';
import { Actions } from 'react-native-router-flux';

class ListItem extends Component {
    onRowPress() {
        console.log('Row Press');
        Actions.checklistEdit({ checklist: this.props.checklist });
    }

    render() {
        const { title } = this.props.checklist;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>{title}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
    },
};

export default ListItem;
