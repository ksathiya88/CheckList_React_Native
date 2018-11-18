import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CheckListFormReducer from './CheckListFormReducer';
import CheckListReducer from './CheckListReducer';
import RadioUseEdit from './RadioUseEdit';

export default combineReducers({
    auth: AuthReducer,
    checkListForm: CheckListFormReducer,
    checkLists: CheckListReducer,
    radio: RadioUseEdit,
});
