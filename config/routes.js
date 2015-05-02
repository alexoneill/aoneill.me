// routes.js
// aoneill - 04/13/15

var exec = require('child_process').exec;

exports.load = function(server) {
  server.get('/', function(req, res, next) {
    res.render('home');
  });

  server.post('/update', function(req, res) {
    exec('git pull', function(error, stdout, stderr) {
      if(error !== null)
        res.json({
          success: true,
        });
      else
        res.json({
          success: false,
          stdout: stdout,
          stder: stderr
        });
    });
  });

  // The 404 Route (ALWAYS Keep this as the last route)
  server.get('/*', function(req, res){
    res.send('404');
  });
}
