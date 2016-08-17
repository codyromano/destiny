var httpProxy = require('http-proxy');
var http = require('http');

var proxy = httpProxy.createProxyServer({target: 'http://localhost:3001'}).listen(80);

