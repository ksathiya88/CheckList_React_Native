import {
    SET_USER,
    SET_PASSWORD,
    SET_LOADING,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT,
} from '../constant';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: false,
    loggedIn: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, email: action.payload };
        case SET_PASSWORD:
            return { ...state, password: action.payload };
        case SET_LOADING:
            return { ...state, loading: true };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                error: 'Authenticattion Failed.',
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
