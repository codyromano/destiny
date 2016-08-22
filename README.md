# Cait Destiny

![https://caitdestiny.com](https://i.imgur.com/mtXrJ7P.jpg)

## Get started

Clone the repo
```
git clone https://github.com/codyromano/destiny.git
```
Start the development server
```
cd destiny/
npm start
open http://localhost:3001
```

## Deploy to Prod

```
cd /destiny/
npm run build -- --release
cd build && node server
open http://localhost:3000
```

## Set up HTTP for Prod (Optional)

I don't expect anyone will want or need to follow this step. It's mostly for my own future reference. But on the off chance you want to run this app on your own domain, you'll need to get your own SSL key and certificate. I got a free one from [StartSSL](https://startssl.com). 

Place your key and cert in the `src` directory:
```
/destiny/src/ssl2.crt
/destiny/src/ssl.key
```
I'm using a proxy server (via Node's `http-proxy`) that maps HTTPS requests to an HTTP server. First make sure the HTTP server is running:
```
ps -aux | grep '3000'
```
You should see the server running on port 3000. If so, start the proxy server:
```
cd /destiny/src/
node proxy.js
```
Now HTTPS requests should be mapped to the HTTP server:
```
open https://yourdomain.com/
```
