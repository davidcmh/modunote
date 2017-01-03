export var axios = require('axios');
var Promise = require("bluebird");

export var requestContexts = () => {
    return {
        type: 'REQUEST_CONTEXTS'
    }
};

export var receiveContexts = (contexts) => {
    return {
        type: 'RECEIVE_CONTEXTS',
        contexts
    }
};

export var requestTopics = () => {
    return {
        type: 'REQUEST_TOPICS'
    }
};

export var receiveTopics = (topics) => {
    return {
        type: 'RECEIVE_TOPICS',
        topics
    }
};

export var requestNotes = (filters) => {
    return {
        type: 'REQUEST_NOTES',
        filters
    }
};

export var receiveNotes = (notes) => {
    return {
        type: 'RECEIVE_NOTES',
        notes
    }
};

export var requestTags = () => {
    return {
        type: 'REQUEST_TAGS'
    }
};

export var receiveTags = (tags) => {
    return {
        type: 'RECEIVE_TAGS',
        tags
    }
};

export var creatingNote = () => {
    return {
        type: 'CREATING_NOTE'
    }
};

export var createdNote = (newNoteId) => {
    return {
        type: 'CREATED_NOTE',
        newNoteId
    }
};

export var addingTags = () => {
    return {
        type: 'ADDING_TAGS'
    }
};

export var addedTags = (newNoteId) => {
    return {
        type: 'ADDED_TAGS'
    }
};

export var fetchContexts = () => {
    return function (dispatch) {
        dispatch(requestContexts());
        return axios.get('/contexts')
            .then(function (response) {
                console.log('Response from axios from fetchContexts');
                console.log(response);

                var contexts = _.reduce(response.data.contexts, function(result, context) {
                    result[context.id] = context;
                    return result;
                }, {});

                dispatch(receiveContexts(contexts));
            });
    };
};

export var fetchTopics = () => {
    return function (dispatch) {
        dispatch(requestTopics());
        return axios.get('/topics')
            .then(function (response) {
                console.log('Response from axios from fetchTopics');
                console.log(response);

                var topics = _.reduce(response.data.topics, function(result, topic) {
                    result[topic.id] = topic;
                    return result;
                }, {});

                dispatch(receiveTopics(topics));
            });
    };
};

export var fetchNotes = (filters={}) => {
    return function (dispatch) {
        dispatch(requestNotes(filters));
        return axios.post('/notes', filters)
            .then(function (response) {
                console.log('Response from axios from fetchNotes');
                console.log(response);

                var notes = _.reduce(response.data.notes, function(result, note) {
                    result[note.id] = note;
                    return result;
                }, {});

                dispatch(receiveNotes(notes));
            });
    };
};


export var fetchTags = () => {
    return function (dispatch) {
        dispatch(requestTags());
        return axios.get('/tags')
            .then(function (response) {
                console.log('Response from axios from fetchTags');
                console.log(response);

                var tags = _.reduce(response.data.tags, function(result, tag) {
                    result[tag.id] = tag;
                    return result;
                }, {});

                dispatch(receiveTags(tags));
            });
    };
};


export var createNote = (noteData, tagIds) => {
    return function (dispatch) {
        dispatch(creatingNote());
        return axios.post('/note', noteData)
            .then(function (response) {
                console.log('Response from axios from createNote');
                console.log(response);
                var newNoteId = response.data.id;
                dispatch(createdNote(newNoteId));
                return newNoteId;
            })
            .then(function(newNoteId) {
                dispatch(addingTags());
                return Promise.each(tagIds, function(tagId) {
                    return axios.post('/tag', {noteId: newNoteId, tagId: tagId})
                        .then(function (response) {
                            console.log('Response from axios from addTag');
                            console.log(response);
                        })
                });
            })
            .then(function() {
                dispatch(addedTags());
            });
    };
};
