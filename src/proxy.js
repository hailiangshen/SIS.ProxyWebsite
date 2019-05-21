const proxy = require('http-proxy-middleware');
var fs = require('fs');
var path = require('path');

// const config = require('./api-address-config.js');
const config = ((dirArr) => {
	let dir = dirArr.find(x => fs.existsSync(path.resolve(__dirname, x)));
	if (dir) {
		return require(dir);
	}
	throw `未找到代理配置文件`;
})(['./api-address-config-local.js', './api-address-config.js']);

var opt = {
    target: config.netApiHost,
    changeOrigin: true,
    router: {
        '/api/': config.netApiHost,
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