import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkListUpdate, checkListCreate } from '../actions';
import { Card, CardSection, Button } from '../common';
import CheckListForm from './CheckListForm';

class CheckListCreate extends Component {
    componentWillMount() {
        this.props.checkListUpdate({
            prop: 'title',
            value: '',
        });

        this.props.checkListUpdate({
            prop: 'items',
            value: [{ checked: false, value: '' }],
        });
    }

    onButtonPress() {
        console.log('Button press');
        const { title, items } = this.props;

        this.props.checkListCreate({ title, items });
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
    const { title, items } = state.checkListForm;

    return { title, items };
};

export default connect(
    mapStateToProps,
    {
        checkListUpdate,
        checkListCreate,
    }
)(CheckListCreate);
