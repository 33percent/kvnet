var express = require('express');
var router = express.Router();
var musers = require('../models/user.js');
var md5 = require('md5');
var session = require('express-session')
/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        if (req.session.user) {
            res.render('index', {
                "username": req.session.user.name
            });
        } else {
            res.render('index', {
                "username": "none"
            });
        }
    } catch (e) {
        console.log(e);
    }


});

router.get('/happypose', function(req, res, next) {
    res.render('happypose');
});

router.get('/likemyschool', function(req, res, next) {
    res.render('likemyschool');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/login', function(req, res, next) {
    var resjson = {
        status: "err",
        data: "nothing"
    };
    musers.findOne({
        "email": req.query.username
    }, function(err, results) {
        if (err) {
            res.send(resjson);
        } else if (results != null) {
            if (md5(md5(req.query.password) + results.passwordhash) == results.password) {
                delete results.password;
                delete results.passwordhash;
                req.session.user = results;
                resjson.status = "success";
                resjson.data = "1";
                res.json(resjson);
            } else {
                res.json(resjson);
            }
        } else {
            resjson.data = "2";
            res.json(resjson);
        }
    })


});



module.exports = router;