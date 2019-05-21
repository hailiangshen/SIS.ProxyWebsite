const proxy = require('http-proxy-middleware');

const config = require('./api-address-config.js');

var opt = {
    target: config.netApiHost,
    changeOrigin: true,
    router: {
        '/api/': 'http://localhost:49648',
        '/sisjava/': config.javaApiHost,
        '/newsis': config.vueHost,
    },
    // proxyTimeout: 15000,
    // logLevel: 'debug',
    onProxyRes: function(proxyRes, req, res) {
    },
    onProxyReq: function(proxyReq, req, res) {
    },
    onError: function(err, req, res) {
        console.log(err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    }
}
module.exports = proxy('**', opt);