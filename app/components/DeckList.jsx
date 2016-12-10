var React = require('react');
import TextField from 'material-ui/TextField';
var {connect} = require('react-redux');
var _ = require('lodash');
var {Link} = require('react-router');
import {List, ListItem} from 'material-ui/List';
var actions = require('actions');

var DeckList = React.createClass({
  render: function() {
    var {dispatch} = this.props;
    var deckNodes = _.map(this.props.decks.items, function(d) {
      return (
          <ListItem primaryText={d.name} key={d.id} onClick={() => dispatch(actions.fetchNotes({"deckId":d.id}))} containerElement={<Link to="/notes"/>}/>
      );
    });

    return (
      <div>
        <TextField
            hintText="Search by notebook or tags"
        /><br />
        <List>
          {deckNodes}
        </List>
      </div>
    )
  }
});


module.exports = connect(
    (state) => {
      return {
        decks: state.decks
      };
    }
)(DeckList);