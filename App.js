import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { logout } from './actions/AuthActions';
import { checkListFetch } from './actions/ChecklistActions';
import ListItem from './components/ListItem';
import RadioUseEdit from './components/RadioUseEdit';

import { Card, CardSection, Button } from './common';
//import CheckList from './components/checklist';

class App extends Component {
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

    createDataSource({ checklists }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.dataSource = ds.cloneWithRows(checklists);
    }

    renderRow(checklist) {
        return <ListItem checklist={checklist} />;
    }

    render() {
        console.log('heellloooooo1111', this.props);
        console.log('heellloooooo2222');

        return (
            <View>
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
                <RadioUseEdit />
            </View>
        );
        // return <View> {this.renderContent()} </View>;
    }
}

const mapStateToProps = state => {
    const checklists = _.map(state.checkLists, (val, uid) => {
        return { ...val, uid };
    });

    console.log('checkLists', checklists);
    return { checklists };
};

export default connect(
    mapStateToProps,
    { logout, checkListFetch }
)(App);
