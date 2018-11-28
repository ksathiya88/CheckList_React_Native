import React, {Component} from 'react';
import {View, Text, ListView, ScrollView} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {logout} from '../actions/AuthActions';
import {checkListFetch} from '../actions/ChecklistActions';
import ListItem from './ListItem';
import RadioUseEdit from './RadioUseEdit';

import {Card, CardSection, Button} from '../common/index';

//import CheckList from './components/checklist';

class CheckLists extends Component {
    componentWillMount() {
        this.props.checkListFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props

        this.createDataSource(nextProps);
    }

    onButtonPress() {
        console.log('heellloooooobutton', this.props);
        this.props.logout();
    }

    createDataSource({checklists}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.dataSource = ds.cloneWithRows(checklists);
    }

    renderRow(checklist) {
        return <ListItem checklist={checklist}/>;
    }

    render() {
        console.log('heellloooooo1111', this.props);
        console.log('heellloooooo2222');

        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Button onPress={() => this.props.logout()}>
                            <Text> logout </Text>
                        </Button>
                    </CardSection>
                </Card>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                <RadioUseEdit/>
            </ScrollView>
        );
        // return <View> {this.renderContent()} </View>;
    }
}

const mapStateToProps = state => {
    const checklists = _.map(state.checkLists, (val, uid) => {
        return {...val, uid};
    });
    const {selectedOption} = state.radio;
    console.log('checkLists', checklists);
    return {checklists, selectedOption};
};

export default connect(
    mapStateToProps,
    {logout, checkListFetch}
)(CheckLists);
