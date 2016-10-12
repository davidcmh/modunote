var express = require('express');

// Create app - no need to pass argument
var app = express();

// Two steps left - tell it the folder to serve + start server

// use() allow you to add functionality to your app
app.use(express.static('public'));

// start server - listen() takes two arguments - port, callback function
app.listen(3000, function() {
  console.log('Express server is running on port 3000');
});
