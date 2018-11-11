import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkListUpdate, checkListCreate } from '../actions';
import { Card, CardSection, Button } from '../common';
import CheckListForm from './CheckListForm';

class CheckListCreate extends Component {
    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.checkListCreate({ name, phone, shift: shift || 'Monday' });
    }

    render() {
        console.log('createProps11', this.props);
        return (
            <Card>
                <CheckListForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    console.log('createProps', state);
    const { name, phone, shift } = state.checkListForm;

    return { name, phone, shift };
};

export default connect(
    mapStateToProps,
    {
        checkListUpdate,
        checkListCreate,
    }
)(CheckListCreate);
