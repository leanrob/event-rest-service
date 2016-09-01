/**
 * Created by robert on 2016-09-01.
 */
var express = require('express');

var authRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
        });
    return authRouter
};

module.exports = router;