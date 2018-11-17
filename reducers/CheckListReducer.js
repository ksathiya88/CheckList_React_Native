import { CHECKLISTS_FETCH_SUCCESS } from '../constant';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log('checklistReducer', state, action);
    switch (action.type) {
        case CHECKLISTS_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
