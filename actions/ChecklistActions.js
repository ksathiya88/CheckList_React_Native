import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    CHECKLIST_UPDATE,
    CHECKLIST_ITEM_UPDATE,
    CHECKLIST_ADD_ITEM,
    CHECKLIST_CREATE,
    CHECKLISTS_FETCH_SUCCESS,
    CHECKLIST_SAVE_SUCCESS,
} from '../constant';

export const checkListUpdate = ({ prop, value }) => {
    return {
        type: CHECKLIST_UPDATE,
        payload: { prop, value },
    };
};

export const checkListItemsUpdate = ({ value, index }) => {
    return {
        type: CHECKLIST_ITEM_UPDATE,
        payload: { value, index },
    };
};

export const checkListAddItems = () => {
    return {
        type: CHECKLIST_ADD_ITEM,
    };
};

export const checkListCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    console.log('Checklist Action', currentUser);
    return dispatch => {
        const newRef = firebase
            .database()
            .ref('User' + currentUser.uid + '/')
            .push();
        newRef
            .set({ name, phone, shift })
            .then(data => {
                //success callback
                console.log('data ', data);
                //this.props.navigation.goBack();
            })
            .catch(error => {
                //error callback
                console.log('error ', error);
            });
    };
};

// export const checkListFetch = () => {
//     const { currentUser } = firebase.auth();

//     return dispatch => {
//         firebase
//             .database()
//             .ref(`/users/${currentUser.uid}/CHECKLIST`)
//             .on('value', snapshot => {
//                 dispatch({
//                     type: CHECKLISTS_FETCH_SUCCESS,
//                     payload: snapshot.val(),
//                 });
//             });
//     };
// };

// export const checkListSave = ({ name, phone, shift, uid }) => {
//     const { currentUser } = firebase.auth();

//     return dispatch => {
//         firebase
//             .database()
//             .ref(`/users/${currentUser.uid}/CHECKLIST/${uid}`)
//             .set({ name, phone, shift })
//             .then(() => {
//                 dispatch({ type: CHECKLIST_SAVE_SUCCESS });
//                 Actions.checkList({ type: 'reset' });
//             });
//     };
// };

// export const checkListDelete = ({ uid }) => {
//     const { currentUser } = firebase.auth();

//     return () => {
//         firebase
//             .database()
//             .ref(`/users/${currentUser.uid}/CHECKLIST/${uid}`)
//             .remove()
//             .then(() => {
//                 Actions.CHECKLISTList({ type: 'reset' });
//             });
//     };
// };
