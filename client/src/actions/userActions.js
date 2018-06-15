import ActionTypes from 'constants/actionTypes';
import { database } from 'fire';

export function dbUpdateUser(user) {
    return dispatch => {
        const userRef = database.ref('users/' + user.id);


        const { profileInfo, profileImg } = user;

        // Update user object in all friends' friend lists


        // Read user ref from database
        userRef.once('value')
        .then((snapshot) => {

            // update user
            const dbUser = snapshot.val();
            dbUser.profileInfo = profileInfo;
            console.log(profileImg);
            if (profileImg) {
                dbUser.profileImg = profileImg;
            }

            //update user objects in all friends' friend lists
            if (dbUser.friends) {
                const dbObjsForUpdate = Object.values(dbUser.friends).map((friend) => {
                    const dbFriend = {obj : { dbFriendKey : friend.dbSelfKey, dbSelfKey : friend.dbFriendKey, id : dbUser.id, profileInfo, firstName : dbUser.firstName, lastName : dbUser.lastName },
                                    id  : friend.id };
                    if (profileImg) {
                        dbFriend.obj.profileImg = profileImg;
                    }
                    return dbFriend;
                })
        
                dbObjsForUpdate.map((obj) => {
                    const objRef = database.ref('users/' + obj.id + '/friends/' + obj.obj.dbSelfKey);
                    objRef.set(obj.obj);
                })
            }

            userRef.set(dbUser)
            .then(() => {
                console.log('UPDATE USER SUCCESS');
                dispatch(updateUser(dbUser));
            })
            .catch((error) => {
                console.log('UPDATE USER FAIL')
                console.log(error);
            })


        })
        .catch((error) => {
            console.log('USER UPDATE READ FAIL');
            console.log(error);
        })


    }
}

export function updateUser(user) {
    return {
        type : ActionTypes.UPDATE_USER,
        user
    };
}