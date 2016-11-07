export var decksReducer = (state={
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

export var notesReducer = (state={
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