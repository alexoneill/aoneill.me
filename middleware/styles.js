// styles.js
// aoneill - 10/23/15

var sass = require('node-sass'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    url = require('url'),
    path = require('path');

module.exports = function(options) {
  var weboffset = options.weboffset || '/';
  var roots = options.roots || [{ '/': '/' }];
  var offset = options.offset || '/';
  var out = options.out || '/';

  return function(req, res, next) {
    // Handle only GET / HEAD requests
    if(req.method != 'GET' && req.method != 'HEAD') {
      return next();
    }
    
    // Make sure we are getting a CSS request
    var reqPath = url.parse(req.url).pathname;
    if(!(/.*\.css$/.test(reqPath))) {
      return next();
    }
    
    // Get basic info
    var dirname = path.dirname(reqPath);
    var filename = path.basename(reqPath, '.css');

    // Remove web offset
    if(dirname.indexOf(weboffset) == dirname.length - weboffset.length) {
      dirname = dirname.substr(0, dirname.length - weboffset.length);
    }
    
    // Get location of SASS / CSS file
    var fsLocation = null
    for(var i = 0; i < roots.length; i++) {
      if(dirname in roots[i]) {
        fsLocation = roots[i][dirname];
        break;
      }
    }

    // Noting we can do if we don't know about it!
    if(fsLocation === null) {
      return next();
    }

    // Files
    var sassFile = path.join(fsLocation, offset, filename + '.scss');
    var cssFile = path.join(fsLocation, out, filename + '.css');
    var exists = false

    // See if SASS file exists
    try {
      var stat = fs.statSync(sassFile);
      exists = stat.isFile()
    } catch (err) {}

    // Let someone else clean up the mess
    if(!exists) {
      return next();
    }

    // See if css exists
    exists = false
    try {
      var stat = fs.statSync(cssFile);
      exists = stat.isFile()
    } catch (err) {}

    // Create it
    if(!exists) {
      var result = sass.renderSync({
        'file': sassFile,
        'outFile': cssFile,
      });
      mkdirp.sync(path.dirname(cssFile));
      fs.writeFileSync(cssFile, result.css.toString());
    }

    // Return the CSS file!
    fs.readFile(cssFile, function(err, data) {
      if(err) throw err;

      res.writeHead(200, {
        'Content-Type': 'text/css',
        'Cache-Control': 'max-age=0'
      });
      res.end(data);
    });
  }
}
