var test = require('tape');
var path = require('path');
var url = require('url');
var curli = require(path.join(__dirname, '..'));
var testServer = require(path.join(__dirname, 'test-server.js'));
var conf = require(path.join(__dirname, '../package.json'));

var ua = conf.name + ' / ' + conf.version;
var server = testServer();

server.listen(0, function() {
  var port = server.address().port;
  var host = '//localhost:' + port;
  var href = 'http:' + host + '/';
  var options = url.parse(href);

  test('Testing server up and running', function(t) {
    t.ok(href, 'Test server running on ' + href);
    server.close();
    t.end();
  });
});
