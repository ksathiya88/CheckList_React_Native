import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CheckListFormReducer from './CheckListFormReducer';
import CheckListReducer from './CheckListReducer';

export default combineReducers({
    auth: AuthReducer,
    checkListForm: CheckListFormReducer,
    checkLists: CheckListReducer,
});
