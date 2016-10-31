var redux = require('redux');
var _ = require('lodash');
import thunkMiddleware from 'redux-thunk'

export var configure = () => {

    var decksReducer = (state={
        isFetching: false,
        items:[]
    }, action) => {
        switch (action.type)  {
            case 'REQUEST_DECKS':
                return _.assign({}, state, {
                    isFetching: true
                });
            case 'RECEIVE_DECKS':
                return _.assign({}, state, {
                    isFetching: false,
                    items: action.decks
                });
            default:
                return state;
        }
    };

    var notesReducer = (state={
        isFetching: false,
        items:[]
    }, action) => {
        switch (action.type)  {
            case 'REQUEST_NOTES':
                return _.assign({}, state, {
                    isFetching: true,
                    filters: action.filters
                });
            case 'RECEIVE_NOTES':
                return _.assign({}, state, {
                    isFetching: false,
                    items: action.notes
                });
            default:
                return state;
        }
    };

    var reducer = redux.combineReducers({
        decks: decksReducer,
        notes: notesReducer
    });

    var store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};