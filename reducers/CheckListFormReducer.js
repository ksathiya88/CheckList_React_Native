import {
    CHECKLIST_UPDATE,
    CHECKLIST_CREATE,
    CHECKLIST_SAVE_SUCCESS,
    CHECKLIST_ITEM_UPDATE,
    CHECKLIST_ADD_ITEM,
    CHECKLIST_CHECKED_UPDATE,
    CHECKLIST_RESET_UPDATE,
    AUTOSAVE_FALSE,
    CHECKLIST_ITEM_DELETE,
    AUTOSAVE_TRUE,
    ERROR
} from '../constant';

const item = {checked: false, value: ''};
const INITIAL_STATE = {
    items: [item],
    title: '',
    autoSave: false,
    error: '',
    uid: ''
};

export default (state = INITIAL_STATE, action) => {
    let stateTemp;
    let itemsCopy = [];
    console.log('checklistform', state, action);
    switch (action.type) {
        case ERROR:
            return {...state, error: action.payload};
        case AUTOSAVE_TRUE:
            const filteredItems = state.items.filter((itemValue) => {
                return itemValue.value === '';
            });
            if (state.title === '') {
                filteredItems.push(state.title);
            }
            console.log("Filtered Items", filteredItems);
            if (filteredItems.length > 0) {
                return {...state, autoSave: true};
            } else {
                return {...state, autoSave: true, error: ''};
            }
        case CHECKLIST_ITEM_DELETE:
            console.log('checklist item delete', state, action);
            stateTemp = {...state};
            itemsCopy = state.items.slice();
            itemsCopy.splice(action.payload, 1);
            console.log(stateTemp);
            return {...stateTemp, items: itemsCopy};

        case AUTOSAVE_FALSE:
            return {...state, autoSave: false};
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
            return {...state, [action.payload.prop]: action.payload.value, error: ''};
        case CHECKLIST_ITEM_UPDATE:
            console.log('checklistitem update', state, action);
            stateTemp = {...state};
            itemsCopy = state.items.slice();
            itemsCopy[action.payload.index].value = action.payload.prop;
            console.log(stateTemp);
            return {...stateTemp, items: itemsCopy};
        case CHECKLIST_ADD_ITEM:
            console.log('checklistadd_item', state, action, item);
            stateTemp = {...state};
            itemsCopy = state.items.slice();
            itemsCopy.push({checked: false, value: ''});
            console.log(stateTemp);
            const fff = {...stateTemp, items: itemsCopy};
            console.log("returnedObj", fff);
            return fff;
        case CHECKLIST_CREATE:
            return {
                ...INITIAL_STATE, title: 'CheckList Name',
                items: [{value: "Item 1", checked: false}],
                uid: action.payload
            };
        case CHECKLIST_SAVE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
