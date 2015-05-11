// server.js
// aoneill - 04/15/15

// Modules
var config = require('./config.js'),
    express = require('express'),
    bodyParser = require('body-parser'),
    hb = require('express-handlebars'),
    sass = require('node-sass-middleware'),
    path = require('path'),
    url = require('url');

// Paths
var _config = path.join(__dirname, config.src);
var _subdomains = path.join(__dirname, config.subdomains);
var _static = path.join(__dirname, config.static);
var _sass = path.join(__dirname, config.sass);

// Init
var server = express();
server.engine('.hbs', hb({
  extname: '.hbs'
}));

// Setup middleware and properties
server.set('view engine', '.hbs');
server.set('views', path.join(__dirname, config.views));
server.use(sass({
  src: _sass,
  dest: path.join(_static, config.css),
  prefix: config.css,
}));
server.use(express.static(_static));
server.use(bodyParser.urlencoded({extended: false}));

// Start up
server.listen(config.port);

// Sub-configurations
console.log("Loading subdomains...");
require(path.join(_config, 'subdomains.js')).load(_subdomains, express, server);

console.log("Loading routes...");
require(path.join(_config, 'routes.js')).load(server);

console.log('Starting on http://0.0.0.0:' + config.port);
