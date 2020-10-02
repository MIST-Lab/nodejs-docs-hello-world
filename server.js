var http = require("http");
var static = require('node-static');
var url = require("url");
var file = new(static.Server)();

function start(route, handle) {
  function onRequest(request, response) {
    file.serve(req, res);
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }
  const port = process.env.PORT || 1337;
  http.createServer(onRequest).listen(port);
  console.log("Server running at http://localhost:%d", port);
}

exports.start = start;