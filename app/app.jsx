var React = require('react');
var ReactDOM = require('react-dom');
var CardViewer = require('CardViewer');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Home = require('Home');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="deck" component={CardViewer}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
