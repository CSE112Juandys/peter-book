import ActionTypes from 'constants/actionTypes';
import initialState from 'reducers/initialState';

export function postReducer(state = initialState.posts, action) {
    
    switch(action.type) {
        case ActionTypes.ADD_POST:
            console.log(action);
            return [
                ...state,
                Object.assign({}, action.post)
            ];

        case ActionTypes.DELETE_POST:
            console.log(action);
            return [
                ...state.filter((post) => {
                    return post.id !== action.post.id
                })
            ];

        case ActionTypes.UPDATE_POST:
            console.log(action);
            return [
                ...state.map((post) => {
                    if (post.dbAuthor === action.post.dbAuthor) {
                        return action.post;
                    }
                    return post;
                })
            ]

        case ActionTypes.READ_ALL_POSTS:
            console.log(action);
            return [
                ...action.posts
            ];
            
        default:
            console.log("default");
            return state;
    }
}