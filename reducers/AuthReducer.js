import {
    SET_USER,
    SET_PASSWORD,
    SET_LOADING,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT, UPDATE_INDEX,
    LOGIN_REGISTER_FAIL,
    INTIAL_FORM_STATE, CLOSE_MODAL,
    INTIAL_LOGIN_STATE
} from '../constant';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: false,
    loggedIn: false,
    selectedIndex: 0,
    displayModal: false,
    title: 'Login'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INTIAL_FORM_STATE:
            return {
                email: '',
                password: '',
                error: '',
                loading: false,
                loggedIn: false,
                selectedIndex: 0,
                displayModal: true,
                title: "Login"

            };
        case INTIAL_LOGIN_STATE:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                displayModal: false,
            };
        case CLOSE_MODAL:
            return {...state, displayModal: false};
        case UPDATE_INDEX:
            if (action.payload === 0) {
                return {...INITIAL_STATE, selectedIndex: action.payload, title: "Login"};
            } else {
                return {...INITIAL_STATE, selectedIndex: action.payload, title: "Register"};
            }
        case SET_USER:
            return {...state, email: action.payload};
        case SET_PASSWORD:
            return {...state, password: action.payload};
        case SET_LOADING:
            return {...state, loading: true};
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, loading: false, loggedIn: true, user: action.payload};
        case LOGIN_USER_FAIL:
            return {
                ...state,
                error: action.payload.message,
                password: '',
                loading: false,
            };
        case LOGIN_REGISTER_FAIL:
            return {
                ...state,
                error: action.payload.message,
                password: '',
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
            };
        default:
            return state;
    }
};
