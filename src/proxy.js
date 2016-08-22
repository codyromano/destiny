var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 3000
  },
  ssl: {
    key: fs.readFileSync('ssl.key',  'utf8'),
cert: fs.readFileSync('ssl2.crt', 'utf8')
  }
}).listen(443); 

http.createServer(function(req, res) {
  res.writeHead(302, {'Location': 'https://caitdestiny.com' + req.url});
  res.end();
}).listen(80);
