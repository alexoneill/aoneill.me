// express.js
// aoneill - 08/27/16

var bodyParser = require('body-parser'),
    express = require('express'),
    morgan = require('morgan'),
    path = require('path');

var config = require(path.join('..', 'config.js'));

var handlebars = require('./handlebars.js'),
    sass = require('./sass.js');

module.exports = function(root) {
  // Express: Handle HTTP/HTTPS requests
  var server = express();

  // Install the templating engine
  server = handlebars(server);

  // Install SASS rendering
  server = sass(server);

  // Request logging
  server.use(morgan('dev'));

  // Form parsing
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));

  // Register static paths
  for(var web in config.web.static) {
    var _static = path.join(root, config.web.static[web]);
    server.use(web, express.static(_static));
  }

  return server;
}
