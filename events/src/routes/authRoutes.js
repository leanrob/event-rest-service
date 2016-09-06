/**
 * Created by robert on 2016-09-01.
 */
var express = require('express');

var authRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var passport = require('passport');

var router = function() {
    // routhe for user to sign-up
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/eventsApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                // TODO: Change with full user when it is created
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                collection.insertOne(user, function (err, results) {
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter
};

module.exports = router;