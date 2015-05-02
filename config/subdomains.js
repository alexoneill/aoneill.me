// subdomains.js
// aoneill - 04/13/15

var _subdomains = ['bong'];

// Modules
var path = require('path'),
    subdomain = require('express-subdomain');

exports.load = function(dir, express, server) {
  _subdomains.map(function(sub) {
    var router = express.Router();
    var subpath = path.join(dir, sub);
    require(subpath + '.js').load(subpath, router);
    server.use(subdomain(sub, router));
  });
}
