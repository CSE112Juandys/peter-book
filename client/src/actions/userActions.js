import ActionTypes from 'constants/actionTypes';
import database from 'database';

export function dbUpdateUser(user) {
    return dispatch => {
        const userRef = dabase.ref('users/' + user.id);

        userRef.set({user})
        .then(() => {
            console.log('UPDATE USER SUCCESS');
            dispatch(updateUser(user));
        })
        .catch((error) => {
            console.log('UPDATE USER FAIL')
        })
    }
}

function updateUser(user) {
    return {
        type : ActionTypes.UPDATE_USER,
        user
    };
}
