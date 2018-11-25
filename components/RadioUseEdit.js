import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import { connect } from 'react-redux';
import { radioSet } from '../actions';

class RadioUseEdit extends Component {
    render() {
        const options = ['USE', 'EDIT'];

        function setSelectedOption(selectedOption) {
            this.props.radioSet(selectedOption);
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
