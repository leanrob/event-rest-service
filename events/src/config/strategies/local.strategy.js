var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        // This is where we would check the DB for username and password
        var user = {
            userName: username,
            password: password
        };
        done(null, user);
    }));
};