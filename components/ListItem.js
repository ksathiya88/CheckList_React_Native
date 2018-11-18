import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection } from '../common';

class ListItem extends Component {
    onRowPress() {
        console.log('Row Press');
        if (this.props.selectedOption === 'USE') {
            console.log('Use ---');
            Actions.checklistUse({ checklist: this.props.checklist });
        } else {
            console.log('Edit ---');
            Actions.checklistEdit({ checklist: this.props.checklist });
        }
    }

    render() {
        console.log('list Item', this.props);
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

const mapStateToProps = state => {
    const { selectedOption } = state.radio;
    return { selectedOption };
};

export default connect(
    mapStateToProps,
    null
)(ListItem);
