// Dependencies
var connect = require('connect')
  , express = require('express')
  , subdomain = require('express-subdomain')
  , hb = require('express-handlebars')
  , path = require('path')
  , url = require('url')
  , port = (process.env.PORT || 80)


///////////////////////////////////////////
//               Init                    //
///////////////////////////////////////////

var server = express();
server.engine('handlebars', hb());

server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, '/views'));
server.use(connect.static(__dirname + '/static'));

server.listen(port);

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

server.get('/', function(req, res, next) {
  res.render('home');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
  res.send('404');
});

console.log('Listening on http://0.0.0.0:' + port);
