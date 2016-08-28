var express = require('express');

var app = express();

var port = Number(process.env.PORT) || 1337;

var eventGroupRouter = express.Router();

// Node will check the public and src views directories before all else...
app.use(express.static('public'));
// Set views directory
app.set('views', 'src/views');

app.set('view engine', 'ejs');

// List of events to display
var eventGroup = [
    {
        course: 'CS101',
        title: 'Assignment 1',
        day: 'monday',
        checked: false
    },
    {
        course: 'CS101',
        title: 'Assignment 2',
        day: 'wednesday',
        checked: false
    },
    {
        course: 'CS101',
        title: 'Assignment 3',
        day: 'sunday',
        checked: false
    },
    {
        course: 'CS101',
        title: 'Midterm',
        day: 'fursday',
        checked: true
    },
    {
        course: 'CS101',
        title: 'Final',
        day: 'tuesday',
        checked: false
    }
];

/*
 Events Router Section Begins
 */

eventGroupRouter.route('/')
    .get(function(req, res) {
        res.render('eventGroup', {
            title: 'eventGroup',
            nav: [{
                Link: '/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }],
            eventGroup: eventGroup
        });
    });

eventGroupRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Event');
    });

// Telling '/Books' that it uses eventGroupRouter
app.use('/eventGroup', eventGroupRouter);

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