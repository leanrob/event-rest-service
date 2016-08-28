var express = require('express');

var app = express();

var port = Number(process.env.PORT) || 1337;

var eventRouter = express.Router();

// Node will check the public and src views directories before all else...
app.use(express.static('public'));
app.set('views', 'src/views');

app.set('view engine', 'ejs');

/*
 Books Router Section Begins
 */

eventRouter.route('/')
    .get(function(req, res) {
        res.send('Hello Events');
    });

eventRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Event');
    });

// Telling '/Books' that it uses eventRouter
app.use('/events', eventRouter);

/*
Books Router Section Ends
*/

// Navigation setup
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});