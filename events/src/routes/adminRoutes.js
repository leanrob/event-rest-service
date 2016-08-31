/**
 * Created by robert on 2016-08-31.
 */
var express = require('express');
var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

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

var router = function (nav) {

    adminRouter.route('/addEvents')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/eventsApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('events');
                collection.insertMany(eventGroup, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
            // res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;