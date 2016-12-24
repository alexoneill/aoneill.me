// sass.js
// aoneill - 12/24/16

var path = require('path'),
    sass = require('node-sass-middleware');

var config = require(path.join('..', 'config.js'));

module.exports = function(server) {
  server.use(sass({
    src:  config.root.sass,
    dest: config.root.sass_dest,
    prefix: config.web.css,
    debug: true,
    outputStyle: 'compressed',
    log: console.log,
  }));

  return server;
}
