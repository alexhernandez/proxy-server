const express = require('express');
const http = require('http');
const https = require('https');
const chalk = require('chalk');
const config = require('./src/config');
const proxy = require('./src/proxy');
const { checkHostsFile, checkSSLCert } = require('./src/utils');

// PROXY SERVER
const app = express();
const { scheme, host, port } = config;
const { exampleProxy } = proxy(config);
const hasHosts = checkHostsFile(host);
const { hasSSLCert, credentials } = checkSSLCert();
const hasHTTPS = scheme === 'https' && hasSSLCert;

// CONFIGURE HEADERS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  }

  next();
});

// REGISTER PROXIES
app.use(exampleProxy);

app.get('/', function (req, res) {
  res.send('Proxy Server - Hello World 👋');
});

// APP REGISTER
const proxyServer = hasHTTPS ? https.createServer(credentials, app) : http.createServer(app);

// APP LISTEN
proxyServer.listen(port, function () {

  if (!hasHosts) {
    console.log(chalk.bold.red('\nPROXY SERVER - Requirements Missing 🚫'));
    proxyServer.close();
  } else if (hasHTTPS) {
    console.log(chalk.bold('\nPROXY SERVER 👋'));
    console.log(chalk.bold.blue(`Listening on https://${host}:${port}\n`));
  } else {
    console.log(chalk.bold('\nPROXY SERVER 👋'));
    console.log(chalk.bold.blue(`Listening on http://${host}:${port}\n`));
  }

});
