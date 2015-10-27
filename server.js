// server.js
// aoneill - 04/15/15

// Modules
var config = require('./config.js'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    bodyParser = require('body-parser'),
    hb = require('express-handlebars'),
    path = require('path');
    
// Custom modules
var styles = require('./middleware/styles.js');

// Paths
var _apps = path.join(__dirname, config.apps);
var _static = path.join(__dirname, config.static);
var _sass = path.join(__dirname, config.sass);

// Get app info
var apps = require(path.join(_apps, 'app.js'));

// Express: Handle HTTPS requests
var server = express();
server.engine('.hbs', hb({
  extname: '.hbs'
}));

// Setup for over-arching server
var views = [path.join(__dirname, config.views), _apps];
server.set('view engine', '.hbs');
server.set('views', views);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// Middle ware to handle SASS / CSS for the server and all apps
server.use(styles({
  'webroot': '/css',
  'roots': [{ '/': __dirname }].concat(apps.getRedirects()),
  'offset': '/assets/sass',
  'out': '/static/css'
}));

// Register static paths
server.use(express.static(_static));
apps.getStatics().forEach(function(elem) {
  var reqPath = Object.keys(elem)[0];
  var fsPath = elem[reqPath];
  server.use(reqPath, express.static(fsPath));
});

// Redirect Express: Forward HTTP requests to HTTPS
var redirect = express();
redirect.get('*', function(req, res) {
  res.redirect('https://' + req.get('host') + req.url);
});

// Servers
var httpServer = http.createServer(redirect);
var httpsServer = https.createServer(config.credentials, server);

// Sub-configurations, then startup
console.log('Loading apps...');
apps.load(server);
  
console.log('Loading main logic...');
require(path.join(__dirname, config.routes)).load(server);

// Start up
console.log('Starting on http://0.0.0.0:' + config.httpPort);
httpServer.listen(config.httpPort);

console.log('Starting on https://0.0.0.0:' + config.httpsPort);
httpsServer.listen(config.httpsPort);
