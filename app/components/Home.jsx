var React = require('react');

var decks = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Machine learning'
  },
  {
    id: 3,
    label: 'JKU'
  }
]

var Home = React.createClass({
  getDefaultProps: function() {
    return {
      decks: decks
    };
  },
  render: function() {
    var deckNodes = this.props.decks.map(function(d) {
      return (
        <h3>{d.label}</h3>
      );
    });

    return (
      <div>
       {deckNodes}
      </div>
    )
  }
});

module.exports = Home;
