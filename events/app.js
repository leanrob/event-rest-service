var express = require('express');

var app = express();

var port = Number(process.env.PORT) || 1337;

// Node will check the public and src views directories before all else...
app.use(express.static('public'));
app.set('views', 'src/views');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from render', list: ['a', 'b']})
});

app.get('/books', function(req, res) {
    res.send('Hello Books');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});