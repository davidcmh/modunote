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
    items: [
        {
            id: 1,
            title: 'Why is the sky blue?',
            content: "Blue light is scattered in all directions by the tiny molecules of air in Earth's atmosphere. **Blue is scattered more than other colors** because it travels as shorter, smaller waves. This is why we see a blue sky most of the time.",
            tags: "science"
        },
        {
            id: 2,
            title: 'What is the capital of Australia?',
            content: "Canberra",
            tags: "generalKnowledge"
        },
        {
            id: 3,
            title: 'When was United Kingdom founded?',
            content: "1 May 1707",
            tags: "history"
        }]
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