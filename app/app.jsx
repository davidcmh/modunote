var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var DeckList = require('DeckList');
var NoteList = require('NoteList');
var axios = require('axios');
var actions = require('actions');
var store = require('configureStore').configure();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="notes" component={NoteList}/>
      <IndexRoute component={DeckList}/>
    </Route>
  </Router>,
  document.getElementById('app')
);

// define actions
var requestDecks = () => {
    return {
        type: 'REQUEST_DECKS'
    }
};

var receiveDecks = (decks) => {
    return {
        type: 'RECEIVE_DECKS',
        decks
    }
};

var requestNotes = (filters) => {
    return {
        type: 'REQUEST_NOTES',
        filters
    }
};

var receiveNotes = (notes) => {
    return {
        type: 'RECEIVE_NOTES',
        notes
    }
};

// Subscribe to changes
store.subscribe(() => {
    console.log('Current state:', store.getState())
});

var fetchDecks = () => {
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

var fetchNotes = (filters={}) => {
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

store.dispatch(fetchDecks());
store.dispatch(fetchNotes({tags:['git']}));