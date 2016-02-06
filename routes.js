// routes.js
// aoneill - 04/13/15

var cp = require('child_process'),
    path = require('path');

module.exports.load = function(server, config) {
  // Home view
  server.get('/', function(req, res) {
    res.render('home');
  });

  // Spit out my resume!
  server.get('/resume', function(req, res) {
    res.sendFile('/docs/resume.pdf', {
      root: path.join(__dirname, config.static)
    });
  });
  
  // Git update endpoint
  server.post('/update', function(req, res) {
    var str = '';
    var git = cp.spawn('/usr/local/bin/aoneill.me-update',
      [__dirname]);
    
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

  // Last route -- 404 Route
  server.all('/*', function(req, res) {
    res.send('404');
  });
}
