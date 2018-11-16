import {
    CHECKLIST_UPDATE,
    CHECKLIST_CREATE,
    CHECKLIST_SAVE_SUCCESS,
    CHECKLIST_ITEM_UPDATE,
    CHECKLIST_ADD_ITEM,
} from '../constant';

const INITIAL_STATE = {
    items: [],
    title: '',
};

export default (state = INITIAL_STATE, action) => {
    let stateTemp;
    let itemsCopy = [];
    console.log('checklistform', state, action);
    switch (action.type) {
        case CHECKLIST_UPDATE:
            console.log('checklistupdate', state, action);
            return { ...state, title: action.payload.value };
        case CHECKLIST_ITEM_UPDATE:
            console.log('checklistitem update', state, action);
            stateTemp = { ...state };
            itemsCopy = state.items.slice();
            itemsCopy[action.payload.index] = action.payload.prop;
            console.log(stateTemp);
            return { ...stateTemp, items: itemsCopy };
        case CHECKLIST_ADD_ITEM:
            console.log('checklistadd_item', state, action);
            stateTemp = { ...state };
            itemsCopy = state.items.slice();
            itemsCopy.push('');
            console.log(stateTemp);
            return { ...stateTemp, items: itemsCopy };
        case CHECKLIST_CREATE:
            return INITIAL_STATE;
        case CHECKLIST_SAVE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
