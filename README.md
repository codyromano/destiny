# Cait Destiny

## Getting started

1. Clone the repo
```
git clone https://github.com/codyromano/destiny.git
```
2. Start the development server
```
cd destiny
npm start
open http://localhost:3001
```

## Starting the Prod server (HTTP)

From the project's root directory, run:
```
npm run build -- --release
cd build && node server
open http://localhost:3000
``

## HTTPs proxy for Prod server

I'm using a proxy for HTTPS. To start the proxy server, navigate to the root directory and run:
```
node proxy.js
```


