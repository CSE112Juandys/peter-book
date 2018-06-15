import ActionTypes from 'constants/actionTypes';
import { database } from 'fire';

export function dbUpdateUser(user) {
    return dispatch => {
        const userRef = database.ref('users/' + user.id);

        userRef.set(user)
        .then(() => {
            console.log('UPDATE USER SUCCESS');
            dispatch(updateUser(user));
        })
        .catch((error) => {
            console.log('UPDATE USER FAIL')
        })
    }
}

export function updateUser(user) {
    return {
        type : ActionTypes.UPDATE_USER,
        user
    };
}