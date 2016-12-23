export var contextsReducer = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_CONTEXTS':
            return _.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_CONTEXTS':
            return _.assign({}, state, {
                isFetching: false,
                items: action.contexts
            });
        default:
            return state;
    }
};


export var topicsReducer = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_TOPICS':
            return _.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_TOPICS':
            return _.assign({}, state, {
                isFetching: false,
                items: action.topics
            });
        default:
            return state;
    }
};


export var tagsReducer = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_TAGS':
            return _.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_TAGS':
            return _.assign({}, state, {
                isFetching: false,
                items: action.tags
            });
        default:
            return state;
    }
};


export var notesReducer = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
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