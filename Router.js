import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import App from './App';
import ChecklistCreate from './components/CheckListCreate';
//import HelloThere from './HelloThere';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="root">
                <Scene
                    key="login"
                    component={LoginForm}
                    title="Please Login"
                    intial
                />
                <Scene
                    key="checkList"
                    component={App}
                    onRight={() => Actions.checklistCreate()}
                    rightTitle="Create CheckList"
                    title="Checklist"
                />
                <Scene key="checklistCreate" component={ChecklistCreate} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
