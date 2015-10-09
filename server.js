// server.js
// aoneill - 04/15/15

// Modules
var config = require('./config.js'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    bodyParser = require('body-parser'),
    hb = require('express-handlebars'),
    sass = require('node-sass-middleware'),
    path = require('path'),
    url = require('url');

// Paths
var _config = path.join(__dirname, config.src);
var _pages = path.join(__dirname, config.pages);
var _static = path.join(__dirname, config.static);
var _sass = path.join(__dirname, config.sass);

// Express: Handle HTTPS requests
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
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// Redirect Express: Forward HTTP requests to HTTPS
var redirect = express();
redirect.get('*', function(req, res) {
  res.redirect('https://' + req.get('host') + req.url);
});

// Servers
var httpServer = http.createServer(redirect);
var httpsServer = https.createServer(config.credentials, server);

// Sub-configurations, then startup
console.log('Loading page routes...');
require(path.join(_config, 'pages.js')).load(_pages, server, function() {
  console.log('Loading main routes...');
  require(path.join(_config, 'routes.js')).load(server);
  
  // Start up
  console.log('Starting on http://0.0.0.0:' + config.httpPort);
  httpServer.listen(config.httpPort);
  
  console.log('Starting on https://0.0.0.0:' + config.httpsPort);
  httpsServer.listen(config.httpsPort);
});
