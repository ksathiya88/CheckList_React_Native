import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkListUpdate, checkListCreate} from '../actions';
import {Card, CardSection, Button} from '../common';
import CheckListUse from './CheckListUse';

class CheckListCreate extends Component {
    componentWillMount() {
        this.props.checkListCreate({title: 'CheckList Name', items: [{value: 'Item 1', checked: false}]});
    }


    render() {
        console.log('createProps11', this.props);
        return (
            <Card>
                <CheckListUse {...this.props} />
            </Card>
        );
    }
}

const mapStateToProps = state => {
    console.log('createProps', state);
    const {uid} = state.checkListForm;
    return {checklist: {title: 'CheckList Name', items: [{checked: false, value: 'Item 1'}], uid}, create: true};
};

export default connect(
    mapStateToProps,
    {
        checkListUpdate,
        checkListCreate,
    }
)(CheckListCreate);
