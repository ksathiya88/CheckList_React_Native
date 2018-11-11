import {
    CHECKLIST_UPDATE,
    CHECKLIST_CREATE,
    CHECKLIST_SAVE_SUCCESS,
} from '../constant';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECKLIST_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CHECKLIST_CREATE:
            return INITIAL_STATE;
        case CHECKLIST_SAVE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
