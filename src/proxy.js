var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');
   /*
var options = {
  ca:   fs.readFileSync('sub.class1.server.ca.pem'),
  key:  fs.readFileSync('ssl.key'),
  cert: fs.readFileSync('ssl.crt')
};
*/
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
