var express = require('express');
var SwaggerExpress = require('swagger-express-mw');

// Create app - no need to pass argument
var app = express();

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.use(express.static('public'));

  var port = process.env.PORT || 10011;
  app.listen(port, function() {
    console.log('Express server is running on port ' + port);
  });

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
