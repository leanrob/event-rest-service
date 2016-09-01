/**
 * Created by robert on 2016-08-28.
 */
var express = require('express');

var eventGroupRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var objectId = require('mongodb').ObjectID;

/*
 Events Router Section Begins
 */

eventGroupRouter.route('/')
    .get(function(req, res) {
        var url = 'mongodb://localhost:27017/eventsApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('events');
            collection.find({}).toArray(function (err, results) {
                res.render('eventGroupView', {
                    title: 'eventGroup',
                    nav: [{
                        Link: '/Books',
                        Text: 'Books'
                    }, {
                        Link: '/Authors',
                        Text: 'Authors'
                    }],
                    eventGroup: results
                });
            })
        });
    });

eventGroupRouter.route('/:id')
    .get(function(req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/eventsApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('events');
            collection.findOne({_id: id}, function (err, results) {
                res.render('eventSingleView', {
                    title: 'eventSingle',
                    nav: [{
                        Link: '/Books',
                        Text: 'Books'
                    }, {
                        Link: '/Authors',
                        Text: 'Authors'
                    }],
                    eventSingle: results
                });
            });
        });
    });

/*
 Books Router Section Ends
 */

module.exports = eventGroupRouter;