var React = require('react');
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

var decks = [
  {
    id: 1,
    label: 'All'
  },
  {
    id: 2,
    label: 'Machine learning'
  },
  {
    id: 3,
    label: 'JKU'
  }
];

var DeckList = React.createClass({
  getDefaultProps: function() {
    return {
      decks: decks
    };
  },
  render: function() {
    var deckNodes = this.props.decks.map(function(d) {
      return (
          <Card>
            <CardHeader title={d.label}/>
          </Card>
      );
    });

    return (
      <div>
        <TextField
            hintText="Search by notebook or tags"
        /><br />
       {deckNodes}
      </div>
    )
  }
});

module.exports = DeckList;
