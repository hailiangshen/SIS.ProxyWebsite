const express = require('express');
const opn = require('opn');
const getPort = require('get-port');

var app = express();
app.use(require('./proxy'));

getPort({port: 3000}).then(port => {
	app.listen(port, function (err) {
		if (err) {
			console.log(err)
			return
		}
		let uri = `http://localhost:${port}`;
		console.log(`start at ${uri}`);
		opn(uri);
	});
});

module.exports = app;
