var test = require('tape');
var path = require('path');
var curli = require(path.join(__dirname, '..'));
var server = require(path.join(__dirname, './server.js')).createServer();

var conf = require(path.join(__dirname, '../package.json'));
var ua = conf.name + ' / ' + conf.version;

server.listen(0, function() {
  var port = server.address().port;
  var host = '//localhost:' + port;
  var href = 'http:' + host + '/';

  test('User agent being sent', function(t) {
    server.on('/', function(req, res) {
      t.equal(req.headers['user-agent'], ua, 'User agent set to "' + ua + '"');
      res.writeHead(200);
      res.end();
    });

    curli(href, function(err, headers) {
      t.error(err, 'Shouldn\'t error');
      server.close();
      t.end();
    });
  });
});
