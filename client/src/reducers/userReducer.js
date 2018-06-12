import ActionTypes from 'constants/actionTypes';
import initialState from 'reducers/initialState';

export function userReducer(state = initialState.user, action) {
    
    switch(action.type) {
        case ActionTypes.UPDATE_USER:
            console.log(action);
            return action.user;

        default:
            console.log("default");
            return state;
    }
}