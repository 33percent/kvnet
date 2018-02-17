var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/happypose',function(req,res,next){
  res.render('happypose');
});

router.get('/likemyschool',function(req,res,next){
  res.render('likemyschool');
});

router.get('/register',function(req,res,next){
  res.render('register');
})

module.exports = router;
