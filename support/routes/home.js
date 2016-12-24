// home.js
// aoneill - 12/24/16

var express = require('express'),
    path = require('path');

var config = require(path.join('..', 'config.js'));

module.exports = function() {
  var router = express.Router();

  router.get('/', function(req, res) {
    return res.render('home');
  });

  router.get('/resume', function(req, res) {
    res.sendFile('/resume/resume.pdf', {
      root: config.root.docs,
    });
  });

  return router;
}
