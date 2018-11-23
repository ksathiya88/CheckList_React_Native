import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import App from './App';
import ChecklistCreate from './components/CheckListCreate';
import ChecklistEdit from './components/CheckListEdit';
import ChecklistUse from './components/CheckListUse';
import RegisterForm from "./components/RegisterForm";
//import HelloThere from './HelloThere';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="root">
                <Scene key="login" component={LoginForm} title="Login" />
                <Scene key="register" component={RegisterForm} title="Register" />
                <Scene
                    key="checkList"
                    component={App}
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

export default RouterComponent;
