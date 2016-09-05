var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unigue: true},
    password: String,
    passwordResetToken: String,
    passwordResetExpries: Date,
    // Social information for login
    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,
    // Profile information
    profile: {
        name: {type: String, default: ''},
        gender: {type: String, default: ''},
        location: {type: String, default: ''},
        website: {type: String, default: ''},
        picture: {type: String, default: ''}
    }
}, {timestamps: true});

/*
Password hash middleware
 */

userSchema.pre('save', function(next) {
    const self = this;
    if (!self.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(self.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            self.password = hash;
            next();
        });
    });
});

/*
Method for comparing user's passwords
 */

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

/*
Gravatar feature to get peoples images from gravatar
 */

userSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
};

const User = mongoose.model(User, userSchema);

module.exports = User;