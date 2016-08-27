var express = require('express');

var app = express();

var port = 1337;

app.listen(port, function(err) {
    console.log('running server on port 1337');
});