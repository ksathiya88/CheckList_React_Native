import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import {
    CHECKLIST_UPDATE,
    CHECKLIST_ITEM_UPDATE,
    CHECKLIST_ADD_ITEM,
    CHECKLIST_CREATE,
    CHECKLISTS_FETCH_SUCCESS,
    CHECKLIST_SAVE_SUCCESS,
    CHECKLIST_CHECKED_UPDATE,
    CHECKLIST_RESET_UPDATE,
    AUTOSAVE_TRUE,
    AUTOSAVE_FALSE, ERROR, CHECKLIST_ITEM_DELETE
} from '../constant';

export const moveToRegister = () => {
    Actions.register();
};
export const makeAutoSaveFalse = () => {
    return {
        type: AUTOSAVE_FALSE
    };
}

export const checkListUpdate = ({prop, value}) => {
    console.log('inside', prop, value);
    return {
        type: CHECKLIST_UPDATE,
        payload: {prop, value},
    };
};

export const checkListItemOnBlurTitle = ({prop, value, uid}) => {
    const {currentUser} = firebase.auth();
    if (value === '') {
        return {
            type: ERROR,
            payload: "Value cannot be empty",
        };
    }

    console.log('inside item Blur Title Update1111 ', prop, value, uid);
    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${uid}`)
            .update({title: value})
            .then(() => {
                dispatch({type: AUTOSAVE_TRUE});
                console.log('checklist save');
            });
    };

};

export const checkListCheckedUpdate = ({prop, index}) => {
    console.log('inside item checked Update ', prop, index);
    return {
        type: CHECKLIST_CHECKED_UPDATE,
        payload: {prop, index},
    };
};

export const checkListItemsUpdate = ({prop, index, uid}) => {
    // const {currentUser} = firebase.auth();
    console.log('inside item Update ', prop, index, uid);

    return {
        type: CHECKLIST_ITEM_UPDATE,
        payload: {prop, index},
    };
};


export const checkListItemOnBlur = ({prop_obj, index, uid}) => {
    const {currentUser} = firebase.auth();
    if (prop_obj.value === '') {
        return {
            type: ERROR,
            payload: "Value cannot be empty",
        };
    }

    const obj = {checked: prop_obj.checked, value: prop_obj.value};
    console.log('inside item Blur Update1111qqq ', prop_obj, index, uid);
    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${uid}/items/${index}`)
            .update(obj)
            .then(() => {
                dispatch({type: AUTOSAVE_TRUE});
                console.log('checklist save');
            });
    };

};

export const checkListItemDelete = (index, checklist) => {
    const {currentUser} = firebase.auth();
    // const obj = {checked: prop_obj.checked, value: prop_obj.value};
    console.log('checkListItem Delete ', index, checklist, checklist.uid);
    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${checklist.uid}/items/${index}`)
            .remove()
            .then(() => {
                //dispatch({type: AUTOSAVE_TRUE});
                console.log('checklist Item delete333333333');
                dispatch({
                    type: CHECKLIST_ITEM_DELETE, payload: index
                });
            });
    };
};


export const checkListAddItems = () => {
    return {
        type: CHECKLIST_ADD_ITEM,
    };
};

export const checkListCreate = ({title, items}) => {
    const {currentUser} = firebase.auth();

    console.log('Checklist Action', currentUser);
    return dispatch => {
        const newRef = firebase
            .database()
            .ref(`user/${currentUser.uid}/checklists`)
            .push();

        newRef
            .set({title, items})
            .then((data) => {
                //success callback
                console.log('checklistCreate data ', data, newRef.key);
                dispatch({type: CHECKLIST_CREATE, payload: newRef.key});
                //Actions.checkList({type: 'reset'});
                //this.props.navigation.goBack();
            })
            .catch((error) => {
                //error callback
                console.log('error ', error);
            });
    };
};

export const checkListFetch = () => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists`)
            .on('value', snapshot => {
                console.log('fetch_value', snapshot.val());
                dispatch({
                    type: CHECKLISTS_FETCH_SUCCESS,
                    payload: snapshot.val(),
                });
            });
    };
};

export const checkListSave = ({title, items, uid}) => {
    const {currentUser} = firebase.auth();
    console.log('Checklist Save', title, items, uid);

    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${uid}`)
            .set({title, items})
            .then(() => {
                console.log('checklist save');
                dispatch({type: CHECKLIST_SAVE_SUCCESS});
                Actions.checkList({type: 'reset'});
            });
    };
};

export const checkListReset = ({items, uid}) => {
    console.log('Checklist reset', items, uid);
    return {
        type: CHECKLIST_RESET_UPDATE,
        payload: items,
    };
};


export const checkListDelete = ({uid}) => {
    const {currentUser} = firebase.auth();
    console.log("CheckListDelete2222333 ", uid);

    return () => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${uid}`)
            .remove()
            .then(() => {
                console.log('checklist delete');
                //dispatch({ type: CHECKLIST_SAVE_SUCCESS });
                Actions.checkList({type: 'reset'});
            });
    };
};
