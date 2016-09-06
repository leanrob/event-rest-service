var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;

var eventsController = function(eventService, nav) {
    var middleware = function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/eventsApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('events');
            collection.find({}).toArray(function (err, results) {
                res.render('eventGroupView', {
                    title: 'eventGroup',
                    nav: nav,
                    eventGroup: results
                });
            })
        });
    };

    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/eventsApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('events');
            collection.findOne({_id: id}, function (err, results) {
                res.render('eventSingleView', {
                    title: 'eventSingle',
                    nav: nav,
                    eventSingle: results
                });
            });
        });
    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
};

module.exports = eventsController;