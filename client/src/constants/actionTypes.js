const actionTypes = {
    /* post actions */
    ADD_POST : 'ADD_POST',
    DELETE_POST : 'DELETE_POST',
    UPDATE_POST : 'UPDATE_POST',
    READ_ALL_POSTS : 'READ_ALL_POSTS',

    /* users action */
    UPDATE_USER : 'UPDATE_USER',

    /* friend actions */
    ADD_FRIEND : 'ADD_FRIEND',
    DELETE_FRIEND : 'DELETE_FRIEND',
    READ_ALL_FRIENDS : 'READ_ALL_FRIENDS',
    CLEAR_ALL_FRIENDS : 'CLEAR_ALL_FRIENDS',

    /* authorize actions */
    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT',
    SIGNUP : 'SIGNUP',
    UPDATE_PASSWORD : 'UPDATE_PASSWORD',

    /* starter actions */
    UPDATE_FIREBASE_STORE_REQUESTED : 'UPDATE_FIREBASE_STORE_REQUESTED',
    UPDATE_FIREBASE_STORE_REJECTED  : 'UPDATE_FIREBASE_STORE_REJECTED',
    UPDATE_FIREBASE_STORE_FULFILLED : 'UPDATE_FIREBASE_STORE_FULFILLED',
};

export default actionTypes
