var test = require('tape');
var path = require('path');
var curli = require(path.join(__dirname, '..'));
var server = require(path.join(__dirname, './server.js')).createServer();

server.listen(0, function() {
  var port = server.address().port;
  var host = '//localhost:' + port;
  var href = 'http:' + host + '/';

  test('Missing protocol', function(t) {
    server.on('/', function(req, res) {
      res.writeHead(200);
      res.end();
    });

    curli(host, function(err, headers) {
      t.ok(err, 'Should error when missing protocol');
      t.notOk(headers, 'No data on error');
      server.close();
      t.end();
    });
  });
});
