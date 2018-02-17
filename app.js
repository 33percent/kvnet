var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session')
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var app = express();
var ip = require('ip');
var ipmodel = require('./models/ipstore');
ipmodel.findOne({
  'ip':ip.address()
}, function(err, data) {
  if (err) {
    console.log(err);
    // } else {
  } else if(data != null){

    var updater = {'times':(data.times+1),
  time:new Date()};
    var ipold = {
      ip:ip.address()
    };
    ipmodel.findOneAndUpdate(ipold, updater, {upsert:true}, function(err, doc){
    });
  } else {
    var ipofuser = new ipmodel({
      ip: ip.address(),
      time: new Date(),
      times:0
    });
    ipofuser.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {

      }
    })
    // }

  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}))


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
