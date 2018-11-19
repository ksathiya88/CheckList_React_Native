import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    CHECKLIST_UPDATE,
    CHECKLIST_ITEM_UPDATE,
    CHECKLIST_ADD_ITEM,
    CHECKLIST_CREATE,
    CHECKLISTS_FETCH_SUCCESS,
    CHECKLIST_SAVE_SUCCESS,
    CHECKLIST_CHECKED_UPDATE,
    CHECKLIST_RESET_UPDATE,
} from '../constant';

export const checkListUpdate = ({ prop, value }) => {
    console.log('inside', prop, value);
    return {
        type: CHECKLIST_UPDATE,
        payload: { prop, value },
    };
};

export const checkListCheckedUpdate = ({ prop, index }) => {
    console.log('inside item checked Update ', prop, index);
    return {
        type: CHECKLIST_CHECKED_UPDATE,
        payload: { prop, index },
    };
};

export const checkListItemsUpdate = ({ prop, index }) => {
    console.log('inside item Update ', prop, index);
    return {
        type: CHECKLIST_ITEM_UPDATE,
        payload: { prop, index },
    };
};

export const checkListAddItems = () => {
    return {
        type: CHECKLIST_ADD_ITEM,
    };
};

export const checkListCreate = ({ title, items }) => {
    const { currentUser } = firebase.auth();

    console.log('Checklist Action', currentUser);
    return dispatch => {
        const newRef = firebase
            .database()
            .ref(`user/${currentUser.uid}/checklists`)
            .push();
        newRef
            .set({ title, items })
            .then(data => {
                //success callback
                console.log('data ', data);
                dispatch({ type: CHECKLIST_CREATE });
                Actions.checkList({ type: 'reset' });
                //this.props.navigation.goBack();
            })
            .catch(error => {
                //error callback
                console.log('error ', error);
            });
    };
};

export const checkListFetch = () => {
    const { currentUser } = firebase.auth();

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

export const checkListSave = ({ title, items, uid }) => {
    const { currentUser } = firebase.auth();
    console.log('Checklist Save', title, items, uid);

    return dispatch => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${uid}`)
            .set({ title, items })
            .then(() => {
                console.log('checklist save');
                dispatch({ type: CHECKLIST_SAVE_SUCCESS });
                Actions.checkList({ type: 'reset' });
            });
    };
};

export const checkListReset = ({ items, uid }) => {
    console.log('Checklist reset', items, uid);
    return {
        type: CHECKLIST_RESET_UPDATE,
        payload: items,
    };
};

export const checkListDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase
            .database()
            .ref(`/user/${currentUser.uid}/checklists/${uid}`)
            .remove()
            .then(() => {
                console.log('checklist delete');
                //dispatch({ type: CHECKLIST_SAVE_SUCCESS });
                Actions.checkList({ type: 'reset' });
            });
    };
};
