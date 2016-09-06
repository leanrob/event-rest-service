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
var router = function (nav) {
    var eventsController = require('../controllers/eventsController')(null, nav);
    // Check to see if signed in first
    eventGroupRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });
    eventGroupRouter.route('/')
        .get(eventsController.getIndex);

    eventGroupRouter.route('/:id')
        .get(eventsController.getById);
    return eventGroupRouter;
};
/*
 Books Router Section Ends
 */

module.exports = router;