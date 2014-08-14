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
    t.end();
  });

  test('User agent being sent', function(t) {
    curli(options, function(err, headers) {
      t.error(err);
      t.equal(headers['user-agent'], ua, 'User agent set to "' + ua + '"');
      t.end();
    });
  });

  test('Full web path as string', function(t) {
    curli(href, function(err, headers) {
      t.error(err);
      t.ok(headers, 'Got headers!');
      t.end();
    });
  });

  test('Missing protocol', function(t) {
    curli(host, function(err, headers) {
      t.ok(err, 'Should error when missing protocol');
      t.notOk(headers, 'If error you get nothing!');
      t.end();
    });
  });

  test('Url parsed object', function(t) {
    curli(options, function(err, headers) {
      t.error(err);
      t.ok(headers, 'Got headers!');
      server.close();
      t.end();
    });
  });
});
