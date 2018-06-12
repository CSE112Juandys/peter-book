import ActionTypes from 'constants/actionTypes';

export default function firebaseStoreReducer(state = null, action) {
    
    switch(action.type) {
        case ActionTypes.UPDATE_FIREBASE_STORE_REQUESTED:
            console.log(action.type);
            return state;

        case ActionTypes.UPDATE_FIREBASE_STORE_REJECTED:
            console.log(action.type);
            return state;

        case ActionTypes.UPDATE_FIREBASE_STORE_FULFILLED:
            console.log(action.type);
            return state;
            
        default:
            console.log("default");
            return state;
    }
}