import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    SET_USER,
    SET_PASSWORD,
    SET_LOADING,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT,
} from '../constant';

export const setUser = username => ({
    type: SET_USER,
    payload: username,
});

export const setPassword = password => ({
    type: SET_PASSWORD,
    payload: password,
});

export const loginUser = (username, password) => {
    return dispatch => {
        dispatch({ type: LOGIN_USER });
        console.log('EmailActions', username, password);
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => {
                console.log(error);

                firebase
                    .auth()
                    .createUserWithEmailAndPassword(username, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};

export const setLoading = () => ({
    type: SET_LOADING,
});

const loginUserFail = dispatch => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
    });

    Actions.reset('checkList');
};

export const logout = () => {
    console.log('logout');
    return dispatch => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: LOGOUT,
                });
                Actions.reset('login');
                console.log('logout successfull');
            });
    };
};
