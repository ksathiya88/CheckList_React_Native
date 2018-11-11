import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    CHECKLIST_UPDATE,
    CHECKLIST_CREATE,
    CHECKLISTS_FETCH_SUCCESS,
    CHECKLIST_SAVE_SUCCESS,
} from '../actions';

export const checkListUpdate = ({ prop, value }) => {
    return {
        type: CHECKLIST_UPDATE,
        payload: { prop, value },
    };
};

export const checkListCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/checklists`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: CHECKLIST_CREATE });
                Actions.checkList({ type: 'reset' });
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
