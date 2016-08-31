/**
 * Created by robert on 2016-08-31.
 */
var express = require('express');
var adminRouter = express.Router();

var router = function (nav) {

    adminRouter.route('/addEvents')
        .get(function (req, res) {
            res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;