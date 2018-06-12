import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import initialState from 'reducers/initialState';
import { authReducer } from 'reducers/authReducer';
import { friendReducer } from 'reducers/friendReducer';
import { postReducer } from 'reducers/postReducer';
import { userReducer } from 'reducers/userReducer';
// helper reducer
import firebaseStoreReducer from 'reducers/firebaseStoreReducer';

const logger = createLogger()

var reducer = combineReducers({
    //starter : firebaseStoreReducer,
    auth : authReducer,
    friends : friendReducer,
    posts : postReducer,
    user : userReducer,
})


const store  = createStore( reducer, 
                            initialState,
                            applyMiddleware(thunk, logger)
                          );

export default store;
