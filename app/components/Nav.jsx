var React = require('react');
var {Link} = require('react-router');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
      </div>
    );
  }
});

module.exports = Nav;
