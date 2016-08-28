/**
 * Created by robert on 2016-08-28.
 */
var express = require('express');

var eventGroupRouter = express.Router();

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

/*
 Books Router Section Ends
 */

module.exports = eventGroupRouter;