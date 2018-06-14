import ActionTypes from 'constants/actionTypes';
import database from 'database';
import { generate, kmsEncrypt } from 'api/crypto'

export function dbDeleteFriend(friendA, friendB) {
    return dispatch => {
        ///////////////////////////////////////////////////////////////////////////
        const refA = database.ref('users/' + friendA.id + '/friends/' + friendB.dbSelfKey);
        const refB = database.ref('users/' + friendB.id + '/friends/' + friendB.dbFriendKey);
        const keyRefA = database.ref('users/' + friendA.id + '/datakeys/' + friendB.id);
        const keyRefB = database.ref('users/' + friendB.id + '/datakeys/' + friendA.id);

        // Updaate user A's list of friend ids
        refA.remove()
        .then(() => {
            console.log('FRIEND A REMOVE SUCCESS');
            dispatch(deleteFriend(friendB.id));
        })
        .catch((error) => {
            console.log('FRIEND A REMOVE FAIL');
        });

        keyRefA.remove()
        .then(() => {
            console.log('FRIEND A DATAKEY REMOVE SUCCESS');
        })
        .catch((error) => {
            console.log('FRIEND A DATAKEY REMOVE FAIL');
        });

        // Updaate user B's list of friend ids
        refB.remove()
        .then(() => {
            console.log('FRIEND B REMOVE SUCCESS');
        })
        .catch((error) => {
            console.log('FRIEND B REMOVE FAIL');
        });

        keyRefB.remove()
        .then(() => {
            console.log('FRIEND B DATAKEY REMOVE SUCCESS');
        })
        .catch((error) => {
            console.log('FRIEND B DATAKEY REMOVE FAIL');
        });
        ///////////////////////////////////////////////////////////////////////////
    }

}

export function dbAddFriend(friendIdA, friendIdB) {
    return dispatch => {
        ///////////////////////////////////////////////////////////////////////////
        const refA = database.ref('users/' + friendIdA + '/friends/');
        const refB = database.ref('users/' + friendIdB + '/friends/');
        const keyRefA = database.ref('users/' + friendIdA + '/datakeys/' + friendIdB);
        const keyRefB = database.ref('users/' + friendIdB + '/datakeys/' + friendIdA);
        const plainDataKey = generate();
        kmsEncrypt(sessionStorage.getItem('atok'), plainDataKey);

        const refBFriend = refB.push();
        const refAFriend = refA.push();

        // Read in user object to add to friend's friends list
        const userToAddRef = database.ref('users/' + friendIdA);
        userToAddRef.once('value')
        .then((snapshot) => {

            // Update user A's list of friend ids
            const { id, firstName, lastName, profileImg, profileInfo } = snapshot.val();
            const friend = { id, dbSelfKey : refBFriend.key, dbFriendKey : refAFriend.key, firstName, lastName, profileImg, profileInfo };

            refBFriend.set(friend)
            .then(() => {
                console.log('FRIEND B ADD SUCCESS');
            })
            .catch((error) => {
                console.log('FRIEND B ADD FAIL');
            });

            const realKey = sessionStorage.getItem('cipher');
            keyRefB.set(realKey)
            .then(() => {
                console.log('FRIEND B DATAKEY ADD SUCCESS');
            })
            .catch((error) => {
                console.log('FRIEND B DATAKEY ADD FAIL');
            });
        })
        .catch((error) => {
            console.log(error);
        })

        // Read in friend object to add to current user's friends list
        const friendToAddRef = database.ref('users/' + friendIdB);
        friendToAddRef.once('value')
        .then((snapshot) => {

            // Update user A's list of friend ids
            const { id, firstName, lastName, profileImg, profileInfo } = snapshot.val();
            const friend = { id, dbSelfKey : refAFriend.key, dbFriendKey : refBFriend.key, firstName, lastName, profileImg, profileInfo, dataKey: plainDataKey };

            refAFriend.set(friend)
            .then(() => {
                console.log('FRIEND A ADD SUCCESS');
            })
            .catch((error) => {
                console.log('FRIEND A ADD FAIL');
            });

            const realKey = sessionStorage.getItem('cipher');
            keyRefA.set(realKey)
            .then(() => {
                console.log('FRIEND A DATAKEY ADD SUCCESS');
            })
            .catch((error) => {
                console.log('FRIEND A DATAKEY ADD FAIL');
            });

            dispatch(addFriend((friend)));
        })
        .catch((error) => {
            console.log(error);
        })
        ///////////////////////////////////////////////////////////////////////////
    }
}

export function dbReadAllFriends(userId) {
    return dispatch => {
        const friendsRef = database.ref('users/' + userId + '/friends/');
        friendsRef.once('value')
        .then((snapshot) => {
            dispatch(readAllFriends(Object.values(snapshot.val())));
        })
        .catch((error) => {
            console.log('READ ALL FRIENDS FAIL');
            console.log(error);
        })
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

function readAllFriends(friends) {
    return {
        type : ActionTypes.READ_ALL_FRIENDS,
        friends
    }
}
