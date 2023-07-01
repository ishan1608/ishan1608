/*jslint browser: false */

const http = require('http');
const wurl = require('wurl');
const fs = require('fs');
const nodeStatic = require('node-static');
const winston = require('winston');

const hostname = '0.0.0.0';
const port = process.env.PORT || 8000;

// Configuring winston
winston.configure({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({filename: 'default.log'})
	]
});
winston.level = 'debug';

const staticServer = new nodeStatic.Server();

const server = http.createServer((req, res) => {
	const firstLocation = wurl(1, req.url);
	winston.log('debug', `Request ${req.method} ${req.url}`);

	if (firstLocation === '' || firstLocation === 'index') {
		fs.readFile('index.html', function (err, fileData) {
			if (!err) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(fileData);
			} else {
				winston.log('error', `Cannot open index.html ${req.method} ${req.url}`);
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('uh-oh.\nThis is embarrassing :(.\nThe server is not working properly. Please report this to me at ishan1608@gmail.com');
			}
		});
	} else if (firstLocation === 'static') {
		staticServer.serve(req, res);
	} else {
		winston.log('debug', `Requested URL not available ${req.method} ${req.url}`);
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('This page is nowhere to be found.');
	}
});

server.listen(port, hostname, () => {
	winston.log('debug', `Server running at http://${hostname}:${port}/`);
});
