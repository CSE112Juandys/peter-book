import ActionTypes from 'constants/actionTypes';
import { updateUser } from 'actions/userActions';
import { readAllPosts } from 'actions/postActions';
import { readAllFriends } from 'actions/friendActions';
import { auth, database } from 'fireConfigs/fire';

export function dbSignUpUser(userToSignUp) {
    return dispatch => {

        const { firstName, lastName, email, password, phone } = userToSignUp;

        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth.currentUser;

            const userObj = {   id : user.uid,
                                firstName,
                                lastName,
                                email,
                                phone,
                                friends : [],
                                photos  : [],
                                profileImg  : null,
                                profileInfo : 'Update your info!'
                            };
    
            database.ref('users/' + user.uid).set(userObj)
            .then(() => {
                console.log('USER SIGNUP SUCCESS');
                dispatch(updateUser(userObj))
                dispatch(authenticate())
            })
            .catch((error) => {
                console.log('USER SIGNUP FAIL');
                console.log(error);
            })
        })
        .catch((error) => {
            console.log('USER CREATE FAIL');
            console.log(error)
        })
    }
}

export function dbLogInUser(userToLogIn) {
    return dispatch => {

        const { email, password } = userToLogIn;

        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            const userRef = database.ref('users/' + auth.currentUser.uid);

            userRef.once('value')
            .then((snapshot) => {
                dispatch(updateUser(snapshot.val()))
                dispatch(authenticate())
            })
        })
        .catch((error) => {
            console.log('USER LOGIN FAIL');
            console.log(error)
        })
    }
}

export function dbLogOutUser() {
    return dispatch => {
        dispatch(logout());
        dispatch(readAllFriends([]));
        dispatch(readAllPosts([]));
    }
}

function authenticate() {
    return {
        type : ActionTypes.AUTHENTICATED,
        authenticated : true
    };
}

function logout() {
    return {
        type : ActionTypes.NOT_AUTHENTICATED,
        authenticated : false
    }
}
