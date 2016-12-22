var redux = require('redux');
var _ = require('lodash');
import thunkMiddleware from 'redux-thunk'
var {contextsReducer, topicsReducer, notesReducer, tagsReducer} = require('reducers');

export var configure = () => {
    var reducer = redux.combineReducers({
        contexts: contextsReducer,
        topics: topicsReducer,
        notes: notesReducer,
        tags: tagsReducer
    });

    var store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};