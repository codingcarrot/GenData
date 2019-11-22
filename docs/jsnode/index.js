// index.js

//required modules
var http = require('http');
var dbcon = require('./db_connect');
var fs = require('fs');
var url = require('url');
var path = require('path');

//create webserver
var server = http.createServer(function (req, res) {

	var pathname = url.parse(req.url).pathname;
	var ext = path.extname(pathname);
	if(ext){
		try {
			if(ext === '.css'){
	            res.writeHead(200, {'Content-Type': 'text/css'});
	        }
	        else if(ext === '.js'){
	            res.writeHead(200, {'Content-Type': 'text/javascript'});
	        }
	        else if(ext === '.html'){
	            res.writeHead(200, {'Content-Type': 'text/html'});
	        }
	        res.write(fs.readFileSync(__dirname + pathname, 'utf8'));
		} catch (e) {
			console.log(e);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(fs.readFileSync('html/404error.html', 'utf8'));
		}
        
        
    }
    else{
    	//serve up index.html as initial page; this should be changed to login page later
    	//TODO: login template
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(fs.readFileSync('html/index.html', 'utf8'));
    }
    res.end();
})



server.listen(8080);
console.log("listening to port 8080");


//connect to db
console.log(dbcon.test());
//request all celllines available and display it 
		// mysql stmt: SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'test'";


