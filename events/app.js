var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = Number(process.env.PORT) || 1337;

var nav = [{
    Link: '/eventGroup',
    Text: 'Events'
}, {
    Link: 'Authors',
    Text: 'Authors'
}];

var eventGroupRouter = require('./src/routes/eventGroupRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

/* Start Middleware */
// Node will check the public and src views directories before all else...
app.use(express.static('public'));
app.use(bodyParser.json()); // look for json passed in
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: 'password',
}));

require('./src/config/passport')(app);

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