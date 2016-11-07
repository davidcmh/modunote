var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var DeckList = require('DeckList');
var NoteList = require('NoteList');
var actions = require('actions');
var store = require('configureStore').configure();
var {Provider} = require('react-redux');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <Route path="notes" component={NoteList}/>
                <IndexRoute component={DeckList}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

// Subscribe to changes
store.subscribe(() => {
    console.log('Current state:', store.getState())
});

//store.dispatch(actions.fetchDecks());
//store.dispatch(actions.fetchNotes({tags: ['git']}));