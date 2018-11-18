import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkListUpdate, checkListSave, checkListDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from '../common';

import CheckListForm from './CheckListForm';

class ChecklistEdit extends Component {
    state = { showModal: false };
    componentWillMount() {
        console.log('checklist edit', this.props.checklist);
        this.props.checkListUpdate({
            prop: 'title',
            value: this.props.checklist.title,
        });

        this.props.checkListUpdate({
            prop: 'items',
            value: this.props.checklist.items,
        });
    }

    onButtonPress() {
        console.log('Button press');
        const { title, items } = this.props;

        this.props.checkListSave({
            title,
            items,
            uid: this.props.checklist.uid,
        });
    }

    onAccept() {
        this.setState({ showModal: false });
        this.props.checkListDelete({ uid: this.props.checklist.uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        console.log('checkListEdit --render', this.props);
        return (
            <Card>
                <CheckListForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save
                    </Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={() =>
                            this.setState({ showModal: !this.state.showModal })
                        }
                    >
                        Delete
                    </Button>
                </CardSection>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    console.log('checkListEdit --mapStateToProps', state);
    const { title, items } = state.checkListForm;

    return { title, items };
};

export default connect(
    mapStateToProps,
    { checkListUpdate, checkListSave, checkListDelete }
)(ChecklistEdit);
