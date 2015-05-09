// subdomains.js
// aoneill - 04/13/15

// Modules
var path = require('path'),
    fs = require('fs'),
    subdomain = require('express-subdomain');

exports.load = function(dir, express, server) {
  // Load all subdomains
  fs.readdir(dir, function(err, files) {
    files.map(function(sub) {
      var subpath = path.join(dir, sub);
      fs.lstat(subpath, function(err, stat) {
        if(stat.isFile() && path.extname(subpath) === '.js') {
          var router = express.Router();
          require(subpath).load(subpath, router);
          server.use(subdomain(sub, router));
        }
      });
    });
  });
}
