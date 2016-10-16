var React = require('react');
var {Link} = require('react-router');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/deck">Deck</Link>
      </div>
    );
  }
});

module.exports = Nav;
