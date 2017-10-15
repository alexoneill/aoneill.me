// support.js
// aoneill - 08/27/16

var path = require('path');

var config = require('./config.js');

// Custom modules
var express = require(config.paths.express),
    github = require(config.paths.github),
    routes = require(config.paths.routes);

module.exports = function() {
  // Root Paths
  var root = path.join(__dirname, '/..');

  // Setup Server
  var server = express(root);

  // Setup GitHub deployment hook
  github(server);

  // Configure routes
  routes(server);

  // Encapsulate the server
  var listen = (function() {
    console.log('Starting on http://0.0.0.0:' + config.port);
    server.listen(config.port);
  });

  return {
    'port': config.port,
    'sport': config.sport,
    'listen': listen,
  };
}
