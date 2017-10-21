/*jslint browser: false */

const http = require('http');
const wurl = require('wurl');
const fs = require('fs');
const static = require('node-static');

const hostname = '0.0.0.0';
const port = 8000;

var staticServer = new static.Server();

const server = http.createServer((req, res) => {
	var firstLocation = wurl(1, req.url);

	if (firstLocation === '' || firstLocation === 'index') {
		fs.readFile('index.html', function(err, file_data) {
            if (!err) {
            	res.writeHead(200, {'Content-Type': 'text/html'});
            	res.end(file_data);
            } else {
                res.writeHead(500, {'Content-Type': 'text/plain'});
			    res.end('uh-oh.\nThis is embarrassing :(.\nThe server is not working properly. Please report this to me at ishan1608@gmail.com');
            }
        });
	} else if (firstLocation === 'static') {
		staticServer.serve(req, res);
	} else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('This page is nowhere to be found.');
	}
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
