export var axios = require('axios');

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