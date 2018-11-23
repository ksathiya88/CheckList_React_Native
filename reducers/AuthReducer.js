import {
    SET_USER,
    SET_PASSWORD,
    SET_LOADING,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT, UPDATE_INDEX,
    LOGIN_REGISTER_FAIL,
    INTIAL_FORM_STATE, CLOSE_MODAL
} from '../constant';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: false,
    loggedIn: true,
    selectedIndex: 0,
    displayModal: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INTIAL_FORM_STATE:
            return {
                email: '',
                password: '',
                error: '',
                loading: false,
                loggedIn: true,
                selectedIndex: 0,
                displayModal: true
            };
        case CLOSE_MODAL:
            return {...state, displayModal: false};
        case UPDATE_INDEX:
            return {...INITIAL_STATE, selectedIndex: action.payload};
        case SET_USER:
            return {...state, email: action.payload};
        case SET_PASSWORD:
            return {...state, password: action.payload};
        case SET_LOADING:
            return {...state, loading: true};
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
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
