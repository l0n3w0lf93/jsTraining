'use strict';
const User = require('../models/user.model');

exports.register = function (req, res){
    console.log(11);
    res.render('./views/register.ejs', {
        title: 'Register'
    });
}

exports.register = function (req, res){
    console.log(req)
}
exports.register = function (req, res){

}
