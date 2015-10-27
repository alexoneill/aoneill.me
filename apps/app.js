// app.js
// aoneill - 10/10/15

var fs = require('fs'),
    path = require('path');

// Function generator to allow apps to easily regitser routes
function routeGen(app) {
  return function(req) {
    // Form path, makde sure no trailing '/'
    req = path.join('/', app, req);
    if(req.substr(-1) === '/')
      req = req.substr(0, req.length - 1);
    return req;
  };
}

// Function generator to allow apps to easily register views
function viewGen(app) {
  return function(viewPath) {
    // Form path, makde sure no leading or trailing '/'
    viewPath = path.join(app, 'views', viewPath);
    if(viewPath.substr(0) === '/')
      viewPath = viewPath.substr(1, viewPath.length);
    if(viewPath.substr(-1) === '/')
      viewPath = viewPath.substr(0, viewPath.length - 1);
    return viewPath;
  };
}

// Function to return list of application paths
function getApps() {
  var files = fs.readdirSync(__dirname);
  
  // Filter results based on if it's a directory
  files = files.map(function(sub) {
    var appPath = path.join(__dirname, sub);
    var stat = fs.lstatSync(appPath);
    return [stat.isDirectory(), appPath];
  });
  files = files.filter(function(info) {
    return info[0];
  });
  files = files.map(function(info) {
    return info[1];
  });

  return files;
}

// Generate a list of dictionaries, mapping requests to where they should go
function getRedirects() {
  var apps = getApps();
  apps = apps.map(function(appPath) {
    var appName = path.basename(appPath);
    var dict = {};
    dict['/' + appName] = appPath;
    return dict;
  });
  return apps;
}

// Generate a list of dictionaries of static paths mapped to file locations
// that should be included in Express's Static search
function getStatics() {
  var apps = getApps();
  apps = apps.map(function(appPath) {
    var appName = path.basename(appPath);
    var dict = {};
    dict['/' + appName] = path.join(appPath, 'static');
    return dict;
  });
  return apps;
}

// Load all applications and their routes
function load(server) {
  var apps = getApps();
  for(var i = 0; i < apps.length; i++)
    require(path.join(apps[i], 'routes.js')).load(
      server, path.basename(apps[i]));
}

// What is exposed in the module
module.exports = {
  'routeGen': routeGen,
  'viewGen': viewGen,
  'getApps': getApps,
  'getRedirects': getRedirects,
  'getStatics': getStatics, 
  'load': load
};
