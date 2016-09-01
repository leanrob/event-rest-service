var express = require('express');
var bodyParser = require('body-parser');

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
var authRouter = require('./src/routes/authRoutes')(nav);

// Node will check the public and src views directories before all else...
app.use(express.static('public'));

// Looks to see if there is a json sent in
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Set views directory
app.set('views', 'src/views');

app.set('view engine', 'ejs');

// Telling '/Books' that it uses eventGroupRouter
app.use('/eventGroup', eventGroupRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

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