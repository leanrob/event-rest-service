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
