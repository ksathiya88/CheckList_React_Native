import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkListUpdate } from '../actions';
import { Card } from '../common';

import CheckListForm from './CheckListForm';

class ChecklistEdit extends Component {
    componentWillMount() {
        console.log('checklist edit', this.props.checklist);
        _.each(this.props.checklist, (prop, value) => {
            console.log('prop', prop);
            this.props.checkListUpdate({ value, prop });
        });
    }

    render() {
        return (
            <Card>
                <CheckListForm />
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const { title, items } = state.checkListForm;

    return { title, items };
};

export default connect(
    mapStateToProps,
    { checkListUpdate }
)(ChecklistEdit);
