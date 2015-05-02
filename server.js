// server.js
// aoneill - 04/15/15

var port = (process.env.PORT || 80)

// Modules
var connect = require('connect')
  , express = require('express')
  , bodyParser = require('body-parser')
  , hb = require('express-handlebars')
  , path = require('path')
  , url = require('url');

var _config = path.join(__dirname, 'config');
var _subdomains = path.join(__dirname, 'subdomains');

// Init
var server = express();
server.engine('handlebars', hb());

server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, '/views'));
server.use(connect.static(__dirname + '/static'));
server.use(bodyParser.urlencoded({ extended: false }));

server.listen(port);

// Sub-configurations
require(path.join(_config, 'subdomains.js')).load(_subdomains, express, server);
require(path.join(_config, 'routes.js')).load(server);

console.log('Listening on http://0.0.0.0:' + port);
