// routes.js
// aoneill - 04/13/15

var cp = require('child_process');

exports.load = function(server) {
  server.get('/', function(req, res, next) {
    res.render('home');
  });

  server.all('/update', function(req, res) {
    var str = '';
    var git = cp.spawn('/usr/bin/git',
      ['-C', __dirname, 'pull']);
    
    git.stdout.on('data', function(chunk) {
      str += chunk;
    });

    git.stdout.on('end', function() {
      res.json({
        success: true,
        out: str
      });
    });
  });

  // The 404 Route (ALWAYS Keep this as the last route)
  server.get('/*', function(req, res){
    res.send('404');
  });
}
