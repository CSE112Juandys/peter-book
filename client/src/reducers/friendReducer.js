import ActionTypes from 'constants/actionTypes';
import initialState from 'reducers/initialState';

export function friendReducer(state = initialState.friends, action) {
    
    switch(action.type) {
        case ActionTypes.ADD_FRIEND:
            console.log(action);
            return [
                ...state,
                Object.assign({}, action.friend)
            ];

        case ActionTypes.DELETE_FRIEND:
            console.log(action);
            return [
                ...state.filter((friend) => {
                    return friend.id !== action.friendId
                })
            ];

        case ActionTypes.READ_ALL_FRIENDS:
            console.log(action);
            return [
                ...action.friends
            ];
            
        default:
            console.log("default");
            return state;
    }
}