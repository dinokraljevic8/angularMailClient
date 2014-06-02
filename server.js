/*
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};


function send404(response) {
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.write('Error 404: resource not found');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {
        'Content-Type': mime.lookup(path.basename(filePath))
    });

    if (mime.lookup(path.basename(filePath)) == 'application/json')
        response.end(fileContents);
    else
        response.end(fileContents);
}

function serveStatic(response, cache, absPath) {

    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

var server = http.createServer(function(request, response) {
    var filePath = false;

    if (request.url == '/') {
        filePath = 'public/index.html';
    }
    else if (request.url == '/api/mail') {
        filePath = 'data/mail.json';
        console.log(filePath);
    } else {
        filePath = 'public' + request.url;
    }

    var absPath = './' + filePath;

    serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
    console.log("Server listening on port 3000.");
});*/
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// a convenient variable to refer to the HTML directory
var public_dir = './public/';

// routes to serve the static HTML files
app.get('/', function(req, res) {
    res.sendfile(public_dir + 'index.html');
});

app.get('/api/mail', function(req, res) {
    res.type('text/json'); // set content-type
    res.sendfile('data/mail.json');
});

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

app.post('/api/send', function(req, res) {
    sleep(3);
    res.json(true);
});

app.listen(process.env.PORT || 3000);

/*
app.get('/', function(req, res) {
    res.type('text/html'); // set content-type
    res.send('i am a beautiful butterfly'); // send text response
});
*/

/*
app.listen(process.env.PORT || 4730);

app.post('/quote', function(req, res) {
    if(!req.body.hasOwnProperty('author') ||
        !req.body.hasOwnProperty('text')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newQuote = {
        author : req.body.author,
        text : req.body.text
    };

    quotes.push(newQuote);
    res.json(true);
});


*/






































