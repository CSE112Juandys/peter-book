import ActionTypes from 'constants/actionTypes';
import database from 'database';

export function dbDeleteFriend(friendIdA, friendIdB) {
    return dispatch => {
        ///////////////////////////////////////////////////////////////////////////
        const refA = database.ref('users/' + friendIdA + '/friends/' + friendIdB);
        const refB = database.ref('users/' + friendIdB + '/friends/' + friendIdA);

        refA.remove()
        .then(() => {
            console.log('FRIENDA REMOVE SUCCESS');
            dispatch(deleteFriend(friendIdB));
        })
        .catch((error) => {
            console.log('FRIENDA REMOVE FAIL');
        });

        refB.remove()
        .then(() => {
            console.log('FRIENDB REMOVE SUCCESS');
        })
        .catch((error) => {
            console.log('FRIENDB REMOVE FAIL');
        });
        ///////////////////////////////////////////////////////////////////////////
    }

}

export function dbAddFriend(friendIdA, friendIdB) {
    return dispatch => {
        ///////////////////////////////////////////////////////////////////////////
        const refA = database.ref('users/' + friendIdA + '/friends/' + friendIdB);
        const refB = database.ref('users/' + friendIdB + '/friends/' + friendIdA);

        const payload = {
            "Datakey" : "ShermanLee"
        }
        refA.set(payload)
        .then(() => {
            console.log('FRIENDA ADD SUCCESS');
        })
        .catch((error) => {
            console.log('FRIENDA ADD FAIL');
        });

        refB.set(payload)
        .then(() => {
            console.log('FRIENDB ADD SUCCESS');
        })
        .catch((error) => {
            console.log('FRIENDB ADD FAIL');
        });

        const friendToAddRef = database.ref('users/' + friendIdB);
        friendToAddRef.once('value')
        .then((snapshot) => {
            dispatch(addFriend((snapshot.val())))
        })
        .catch((error) => {
            console.log('NO FRIEND TO ADD');
        })
        ///////////////////////////////////////////////////////////////////////////
    }
}


function deleteFriend(friendId) {
    return {
        type : ActionTypes.DELETE_FRIEND,
        friendId
    };
}

function addFriend(friend) {
    return {
        type : ActionTypes.ADD_FRIEND,
        friend
    };
}