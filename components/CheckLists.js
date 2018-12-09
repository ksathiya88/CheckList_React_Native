import React, {Component} from 'react';
import Swipeout from 'react-native-swipeout';
import {View, Text, ListView, ScrollView} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {logout} from '../actions/AuthActions';
import {checkListFetch, checkListDelete} from '../actions/ChecklistActions';
import ListItem from './ListItem';


import {Card, CardSection, Button} from '../common/index';

//import CheckList from './components/checklist';

class CheckLists extends Component {
    propObject = this.props;

    componentWillMount() {
        this.props.checkListFetch();
        this.propObject = this.props;
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

    renderRow(checklist, propObject) {
        console.log("Checklist4444444 Delete", checklist, propObject);
        if (!Array.isArray(checklist.items)) {
            console.log("came inside ", checklist.title)
            let items = [];
            for (let i in checklist.items) {
                if (typeof items[i] === 'object') {
                    items.push(i, checklist.items[i]);
                }
            }
            checklist.items = items;
        }
        console.log("Checklist4444444 Delete changed ", checklist, propObject);

        const swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {
                propObject.checkListDelete(checklist)
            }
        }];
        return (<Swipeout right={swipeBtns}>
            <ListItem checklist={checklist}/>
        </Swipeout>);
    }

    render() {
        console.log('heellloooooo1111', this.props);
        console.log('heellloooooo2222');
        const propObject = this.props;
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
                    renderRow={(checklist) => {
                        return this.renderRow(checklist, this.props)
                    }}
                />
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
    {logout, checkListFetch, checkListDelete}
)(CheckLists);
