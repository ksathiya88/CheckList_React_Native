import React from 'react';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import LoginForm from './components/loginForm';
import CheckLists from './components/CheckLists';
import ChecklistCreate from './components/CheckListCreate';
import ChecklistEdit from './components/CheckListEdit';
import ChecklistUse from './components/CheckListUse';

const RouterComponent = (props) => {
    console.log("Router props", props);
    return (
        <Router sceneStyle={{paddingTop: 65}}>
            <Scene key="root">
                <Scene key="login" component={LoginForm} title={props.title}/>
                <Scene
                    key="checkList"
                    component={CheckLists}
                    onRight={() => Actions.checklistCreate()}
                    rightTitle="Create CheckList"
                    title="Checklist"
                    intial
                />
                <Scene
                    key="checklistCreate"
                    component={ChecklistCreate}
                    title="Create Checklist"
                />
                <Scene
                    key="checklistEdit"
                    component={ChecklistEdit}
                    title="Edit Checklist"
                />
                <Scene
                    key="checklistUse"
                    component={ChecklistUse}
                    title="Use Checklist"
                />
            </Scene>
        </Router>
    );
};

const mapStateToProps = ({auth}) => {
    const {title} = auth;
    return {title};
};

export default connect(
    mapStateToProps, null
)(RouterComponent);
