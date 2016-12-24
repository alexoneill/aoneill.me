// routes.js
// aoneill - 12/24/16

var path = require('path');

var home = require('./home.js');

module.exports = function(server) {
  // Routers
  server.use('/', home());

  // Final 404 Route
  server.all('/*', function(req, res) {
    res.sendStatus(404);
  });
}
