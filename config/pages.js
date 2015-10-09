// pages.js
// aoneill - 10/09/15

// Modules
var path = require('path'),
    fs = require('fs');

module.exports.load = function(dir, server, callback) {
  // Load all subdomains
  fs.readdir(dir, function(err, files) {
    if(!err) {
      
      // Function for callback after all aysnc calls
      var counter = files.length;
      function done() { --counter || callback(); }

      files.map(function(sub) {
        var subpath = path.join(dir, sub);
        fs.lstat(subpath, function(err, stat) {
          if(stat.isFile() && path.extname(subpath) === '.js') {
            var basename = path.basename(subpath, '.js');
            require(subpath).load(path.join(path.dirname(subpath), basename), 
              basename, server);
          }

          // Try callback
          done();
        });
      });
    }
  });
}
