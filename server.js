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
    sleep(3000);
    res.json(true);
});

app.listen(process.env.PORT || 3000);

console.log("listening on port 3000");

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