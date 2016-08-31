var express = require('express');

var app = express();

var port = Number(process.env.PORT) || 1337;

var nav = [{
    Link: '/eventGroup',
    Text: 'Events'
}, {
    Link: 'Authors',
    Text: 'Authors'
}];

var eventGroupRouter = require('./src/routes/eventGroupRoutes');
var adminRouter = require('./src/routes/adminRoutes')(nav);

// Node will check the public and src views directories before all else...
app.use(express.static('public'));
// Set views directory
app.set('views', 'src/views');

app.set('view engine', 'ejs');

// Telling '/Books' that it uses eventGroupRouter
app.use('/eventGroup', eventGroupRouter);
app.use('/Admin', adminRouter);

// Navigation setup
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/eventGroup',
            Text: 'Events'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});