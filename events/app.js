var express = require('express');

var app = express();

var port = 1337;

// Node will check the public and src views directories before all else...
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(port, function(err) {
    console.log('running server on port 1337');
});