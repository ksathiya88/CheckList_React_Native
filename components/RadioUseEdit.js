import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import { connect } from 'react-redux';
import { radioSet } from '../actions';

import 'prop-types';

class RadioUseEdit extends Component {
    render() {
        const options = ['USE', 'EDIT'];

        function setSelectedOption(selectedOption) {
            this.props.radioSet(selectedOption);
        }

        function renderOption(option, selected, onSelect, index) {
            const style = selected ? { fontWeight: 'bold' } : {};

            return (
                <TouchableWithoutFeedback onPress={onSelect} key={index}>
                    <Text style={style}>{option}</Text>
                </TouchableWithoutFeedback>
            );
        }

        function renderContainer(optionNodes) {
            return <View>{optionNodes}</View>;
        }

        return (
            <View style={{ margin: 50 }}>
                <SegmentedControls
                    options={options}
                    onSelection={setSelectedOption.bind(this)}
                    selectedOption={this.props.selectedOption}
                />
                <Text>Selected option: {this.props.selectedOption}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { selectedOption } = state.radio;

    return { selectedOption };
};

export default connect(
    mapStateToProps,
    { radioSet }
)(RadioUseEdit);
