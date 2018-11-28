import {
    CHECKLIST_UPDATE,
    CHECKLIST_CREATE,
    CHECKLIST_SAVE_SUCCESS,
    CHECKLIST_ITEM_UPDATE,
    CHECKLIST_ADD_ITEM,
    CHECKLIST_CHECKED_UPDATE,
    CHECKLIST_RESET_UPDATE,
} from '../constant';

const item = {checked: false, value: ''};
const INITIAL_STATE = {
    items: [item],
    title: '',
};

export default (state = INITIAL_STATE, action) => {
    let stateTemp;
    let itemsCopy = [];
    console.log('checklistform', state, action);
    switch (action.type) {
        case CHECKLIST_RESET_UPDATE:
            console.log('checklist reset update', state, action);
            stateTemp = {...state};
            itemsCopy = action.payload.slice();
            return {...stateTemp, items: itemsCopy};
        case CHECKLIST_CHECKED_UPDATE:
            console.log('checklist checked update', state, action);
            stateTemp = {...state};
            itemsCopy = state.items.slice();
            if ('checked' in itemsCopy[action.payload.index]) {
                itemsCopy[action.payload.index].checked = action.payload.prop;
            }
            console.log(stateTemp);
            return {...stateTemp, items: itemsCopy};
        case CHECKLIST_UPDATE:
            console.log('checklistupdate', state, action);
            return {...state, [action.payload.prop]: action.payload.value};
        case CHECKLIST_ITEM_UPDATE:
            console.log('checklistitem update', state, action);
            stateTemp = {...state};
            itemsCopy = state.items.slice();
            itemsCopy[action.payload.index].value = action.payload.prop;
            console.log(stateTemp);
            return {...stateTemp, items: itemsCopy};
        case CHECKLIST_ADD_ITEM:
            console.log('checklistadd_item', state, action);
            stateTemp = {...state};
            itemsCopy = state.items.slice();
            itemsCopy.push({...item});
            console.log(stateTemp);
            return {...stateTemp, items: itemsCopy};
        case CHECKLIST_CREATE:
            return INITIAL_STATE;
        case CHECKLIST_SAVE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
