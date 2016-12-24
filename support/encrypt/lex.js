// lex.js
// aoneill - 12/24/16

// Adapted from https://github.com/Daplie/letsencrypt-express

var lencrypt = require('letsencrypt'),
    http = require('http'),
    https = require('https'),
    Promise = require('bluebird'),
    redirect = require('redirect-https');

module.exports.create = function (opts) {
  // Accept all defaults for le.challenges, le.store, le.middleware
  var le = lencrypt.create(opts);

  opts.listen = function (plainPort, port) {
    var promises = [];
    var plainPorts = plainPort;
    var ports = port;

    if (!plainPorts || !ports) {
      plainPorts = 80;
      ports = 443;
    }

    if (!Array.isArray(plainPorts)) {
      plainPorts = [ plainPorts ];
      ports = [ ports ];
    }

    plainPorts.forEach(function (p) {
      promises.push(new Promise(function (resolve, reject) {
        http.createServer(
          le.middleware(redirect())).listen(p, function() {
            console.log("Handling ACME challenges and redirecting to " +
                "https on plain port " + p);
            resolve();
          }).on('error', reject);
      }));
    });

    var servers = [];
    ports.forEach(function (p) {
      promises.push(new Promise(function (resolve, reject) {
        var server = https.createServer(
            le.httpsOptions, le.middleware(le.app)).listen(p, function() {
              console.log("Handling ACME challenges and serving https " + p);
              resolve();
            }).on('error', reject);

        servers.push(server);
      }));
    });

    if (!Array.isArray(port)) {
      servers = servers[0];
    }

    return servers;
  };


  return le;
};
