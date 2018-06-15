import ActionTypes from 'constants/actionTypes';
import { database } from 'fire';

export function dbDeleteFriend(friendA, friendB) {
    return dispatch => {
        ///////////////////////////////////////////////////////////////////////////
        const refA = database.ref('users/' + friendA.id + '/friends/' + friendB.dbSelfKey);
        const refB = database.ref('users/' + friendB.id + '/friends/' + friendB.dbFriendKey);

        // Updaate user A's list of friend ids
        refA.remove()
        .then(() => {
            console.log('FRIEND A REMOVE SUCCESS');
            dispatch(deleteFriend(friendB.id));
        })
        .catch((error) => {
            console.log('FRIEND A REMOVE FAIL');
        });

        // Updaate user B's list of friend ids
        refB.remove()
        .then(() => {
            console.log('FRIEND B REMOVE SUCCESS');
        })
        .catch((error) => {
            console.log('FRIEND B REMOVE FAIL');
        });
        ///////////////////////////////////////////////////////////////////////////
    }

}

export function dbAddFriend(friendIdA, friendIdB) {
    return dispatch => {
        ///////////////////////////////////////////////////////////////////////////
        const refA = database.ref('users/' + friendIdA + '/friends/');
        const refB = database.ref('users/' + friendIdB + '/friends/');

        // ENCRYPTION HERE?

        const refBFriend = refB.push();
        const refAFriend = refA.push();

        // Read in user object to add to friend's friends list 
        const userToAddRef = database.ref('users/' + friendIdA);
        userToAddRef.once('value')
        .then((snapshot) => {

            // Update user A's list of friend ids
            const { id, firstName, lastName, profileImg, profileInfo } = snapshot.val();
            const friend = {    id, 
                                dbSelfKey : refBFriend.key, 
                                dbFriendKey : refAFriend.key, 
                                firstName, 
                                lastName,
                                profileInfo };

            if (profileImg) {
                friend.profileImg = profileImg;
            }

            refBFriend.set(friend)
            .then(() => {
                console.log('FRIEND B ADD SUCCESS');
            })
            .catch((error) => {
                console.log('FRIEND B ADD FAIL');
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
            const friend = {    id, 
                                dbSelfKey : refAFriend.key, 
                                dbFriendKey : refBFriend.key, 
                                firstName, lastName, 
                                profileInfo };

            if (profileImg) {
                friend.profileImg = profileImg;
            }

            refAFriend.set(friend)
            .then(() => {
                console.log('FRIEND A ADD SUCCESS');
            })
            .catch((error) => {
                console.log('FRIEND A ADD FAIL');
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