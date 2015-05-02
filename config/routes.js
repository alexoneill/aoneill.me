// routes.js
// aoneill - 04/13/15

exports.load = function(server) {
  server.get('/', function(req, res, next) {
    res.render('home');
  });

  // The 404 Route (ALWAYS Keep this as the last route)
  server.get('/*', function(req, res){
    res.send('404');
  });
}
