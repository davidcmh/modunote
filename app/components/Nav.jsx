var React = require('react');
var {Link} = require('react-router');
import {Tabs, Tab} from 'material-ui/Tabs';

var Nav = React.createClass({
  render: function() {
    return (
      <div>
          <Tabs>
              <Tab label="Home" containerElement={<Link to="/"/>}/>
              <Tab label="Notes" containerElement={<Link to="/notes"/>}/>
          </Tabs>
      </div>
    );
  }
});

module.exports = Nav;
