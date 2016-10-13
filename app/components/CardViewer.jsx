var React = require('react');
var Card = require('Card');

var CardViewer = React.createClass({
  getDefaultProps: function() {
    return {};
  },
  render: function() {
    var cardNodes = this.props.cards.map(function(c) {
      return (
        <Card cardData={c} key={c.id}/>
      );
    });

    return (
      <div>
        {cardNodes}
      </div>
    )
  }
});

module.exports = CardViewer;
