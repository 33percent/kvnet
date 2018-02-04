var express = require('express');
var router = express.Router();
var q = require('q');
var musers = require('../models/user.js');
var md5 = require('md5');
router.get('/', function(req, res, next) {
        res.render('admin/login', {
            error: req.query.error
        });
});

router.get('/dashboard', function(req, res, next) {
    res.render('admin/dashboard')
})


router.post('/login', function(req, res, next) {
    console.log(req.body);
    try {
        musers.findOne({
            'email': req.body.email
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (data != null) {
                    if (md5(md5(req.body.password) + data.passwordhash) == data.password) {

                        res.redirect('/admin/dashboard');
                    } else {
                        res.redirect('/admin/?error=error')
                    }
                } else {
                    res.redirect('/admin/?error=error')
                }

            }
        });
        // });
    } catch (e) {
        console.log(e);
    }

})



router.get('/insert', function (req, res, next) {
try{
  var newuser = new musers({
      name: "admin",
      email: "admin@kvnet.in",
      phone: '9994370099',
      passwordhash:'15978',
      password:md5(md5("psychologypark") + '15978')
  });
  console.log(newuser);
  newuser.save(function (err, data) {
      if (err) {
          console.log(err);
          res.send(err);
      } else {
          console.log(data);
          res.send(data);
      }
  })
}catch(e){
  console.log(e)
}

});




module.exports = router;
