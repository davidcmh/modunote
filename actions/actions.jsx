export var axios = require('axios');

export var requestDecks = () => {
    return {
        type: 'REQUEST_DECKS'
    }
};

export var receiveDecks = (decks) => {
    return {
        type: 'RECEIVE_DECKS',
        decks
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

export var fetchDecks = () => {
    return function (dispatch) {
        dispatch(requestDecks());
        return axios.get('/decks')
            .then(function (response) {
                console.log('Response from axios from fetchDecks');
                console.log(response);

                var decks = _.reduce(response.data.decks, function(result, deck) {
                    result[deck.id] = deck;
                    return result;
                }, {});

                dispatch(receiveDecks(decks));
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