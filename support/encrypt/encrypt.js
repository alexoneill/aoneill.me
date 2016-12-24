// encrypt.js
// aoneill - 12/24/16

var path = require('path');

var config = require(path.join('..', 'config.js')),
    lencrypt = require('./lex.js');

// Lets Encrypt configuration
var lconfig = {
  server: 'https://acme-v01.api.letsencrypt.org/directory',
  email:  'me@aoneill.me',
  agreeTos: true,
  approvedDomains: [
    'aoneill.me',
  ],
};

module.exports = function(server) {
  if(!config.dev) {
    lconfig.app = server;
    var app = lencrypt.create(lconfig);

    return (function() {
      console.log('Starting on http://0.0.0.0:' + config.port);
      console.log('            https://0.0.0.0:' + config.sport);
      app.listen(config.port, config.sport);
    });
  }

  // Skip it for dev
  return (function() {
    console.log('Starting on http://0.0.0.0:' + config.port);
    server.listen(config.port);
  });
}
