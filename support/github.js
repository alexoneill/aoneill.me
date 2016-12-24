// github.js
// aoneill - 12/24/16

var child = require('child_process'),
    GithubWebHook = require('express-github-webhook'),
    process = require('process'),
    _ = require('underscore');

var config = require('./config.js');

module.exports = function(server) {
  var webhook = GithubWebHook(config.github);

  webhook.on('push', function(repo, data) {
    var branch = data.ref.replace(/^refs\/heads\//, '');
    if(branch === 'master') {
      var files = _.flatten(_.map(data.commits, function(commit) {
        return [commit.added, commit.removed, commit.modified];
      }));

      child.execFile(config.github.script, files, function(err, stdout) {
        if(err) {
          console.log('err: Could not update with GitHub push: ' +
              _.map(data.commits, function(commit) {
                return commit.id;
          }));

          return;
        }

        console.log('GitHub: Successful update!');
      });
    }
  });

  server.use(webhook);
}
