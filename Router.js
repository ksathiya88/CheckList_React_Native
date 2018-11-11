import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import App from './App';
import Checklist from './components/checklist';
//import HelloThere from './HelloThere';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
            <Scene key="root">
                <Scene
                    key="checkList"
                    component={App}
                    onRight={() => Actions.checklistCreate()}
                    rightTitle="Create CheckList"
                    title="Checklist"
                    initial
                />
                <Scene key="checklistCreate" component={Checklist} />
                <Scene key="login" component={LoginForm} title="Please Login" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;