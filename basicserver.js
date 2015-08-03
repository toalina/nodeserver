'use strict';

var http = require('http'); // we need the http module
var path = require('path'); // we need the path locating module
var fs = require('fs'); // we need the file system module


function getFile(filePath, res, page404) {
  fs.exists(filePath, function(exists){
    //if it does
    if (exists) {
      fs.readFile(filePath, function(err, contents) {
        if(!err){ // and no error
          res.end(contents);
        } else {
          console.dir(err); // otherwise, inspect error in console
        };
      });
    } else {
      // if file doesn't exist
      fs.readFile(page404, function(err, contents){
        if(!err) { // and no error
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(contents);
        } else {
          console.dir(err);
        };
      });
    };
  });
};

function requestListener(req, res) {
  var fileName = path.basename(req.url) || 'index.html'; //file requested
  var localFolder = __dirname + '/partials/'; //where pub files are located
  var page404 = localFolder + '404.html';

  getFile((localFolder + fileName), res, page404);
};

// create the server, listen for HTTP request on port 8080
http.createServer(requestListener).listen(8080);
