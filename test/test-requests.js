var test = require('tape');
var url = require('url');
var path = require('path');
var curli = require(path.join(__dirname, '..'));
var server = require(path.join(__dirname, './server.js')).createServer();

server.listen(0, function() {
  var port = server.address().port;
  var host = '//localhost:' + port;
  var href = 'http:' + host + '/';
  var options = url.parse(href);
  var testHeaders = {
    'content-type': 'application/json; charset=UTF-8'
  };

  server.on('/', function(req, res) {
    res.writeHead(200, testHeaders);
    res.end();
  });

  test('Full url as string', function(t) {
    curli(href, function(err, headers) {
      t.error(err, 'Shouldn\'t error');
      t.ok(headers, 'Headers sent');
      t.equal(headers['content-type'], testHeaders['content-type'], '\'Content-Type\' header set');
      t.end();
    });
  });

  test('url.parse()\'d url string', function(t) {
    curli(options, function(err, headers) {
      t.error(err, 'Shouldn\'t error');
      t.ok(headers, 'Headers sent');
      t.equal(headers['content-type'], testHeaders['content-type'], '\'Content-Type\' header set');
      server.close();
      t.end();
    });
  });
});
