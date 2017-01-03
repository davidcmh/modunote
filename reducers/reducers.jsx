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
    isAdding: false,
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
        case 'ADDING_TAGS':
            return _.assign({}, state, {
                isAdding: true
            });
        case 'ADDED_TAGS':
            return _.assign({}, state, {
                isAdding: false
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

export var noteReducer = (state = {
    isProcessing: false,
    newNoteId: null
}, action) => {
    switch (action.type) {
        case 'CREATING_NOTE':
            return _.assign({}, state, {
                isProcessing: true,
                newNoteId: null
            });
        case 'CREATED_NOTE':
            return _.assign({}, state, {
                isProcessing: false,
                newNoteId: action.newNoteId
            });
        default:
            return state;
    }
};