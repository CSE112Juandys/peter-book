import ActionTypes from 'constants/actionTypes';
import initialState from 'reducers/initialState';

export function authReducer(state = initialState.auth, action) {
    
    switch(action.type) {
        case ActionTypes.AUTHENTICATED:
            console.log(action);
            return true;

        case ActionTypes.NOT_AUTHENTICATED:
            console.log(action);
            return false;
            
        default:
            console.log("default");
            return state;
    }
}