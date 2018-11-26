import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import {
    SET_USER,
    SET_PASSWORD,
    SET_LOADING,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT, UPDATE_INDEX,
    LOGIN_REGISTER_FAIL, INTIAL_FORM_STATE, CLOSE_MODAL, INTIAL_LOGIN_STATE,
} from '../constant';

export const setUser = username => ({
    type: SET_USER,
    payload: username,
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const updateIndex = index => ({
    type: UPDATE_INDEX,
    payload: index
});


export const setPassword = password => ({
    type: SET_PASSWORD,
    payload: password,
});

export const registerUser = (username, password) => {
    return dispatch => {
        dispatch({type: LOGIN_USER});
        console.log('Register', username, password);
        firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then(user => loginRegisterSuccess(dispatch))
            .catch(error => loginRegisterFail(dispatch, error));
    };
};


export const loginUser = (username, password) => {
    return dispatch => {
        dispatch({type: LOGIN_USER});
        console.log('EmailActions', username, password);
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => {
                console.log("UserFail", error);
                loginUserFail(dispatch, error);
            });
    };
};

export const setLoading = () => ({
    type: SET_LOADING,
});

const loginUserFail = (dispatch, error) => {
    dispatch({type: LOGIN_USER_FAIL, payload: error});
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
    });

    Actions.reset('checkList');
};

const loginRegisterSuccess = (dispatch) => {
    dispatch({type: INTIAL_FORM_STATE});
};

const loginRegisterFail = (dispatch, error) => {
    console.log("RegisterFail", error);
    dispatch({type: LOGIN_REGISTER_FAIL, payload: error});
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

export const checkLoggedIn = () => {
    return dispatch => {
        dispatch({type: LOGIN_USER});
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user,
                });
                Actions.reset('checkList');
            } else {
                dispatch({
                    type: INTIAL_LOGIN_STATE
                });
            }
        });
    };
}
