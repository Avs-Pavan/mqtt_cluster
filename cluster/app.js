var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//starting mongo db
require('./util/db');
require('./util/mqtt.handler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brokerRouter = require('./routes/brokerRoutes');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brokers',brokerRouter);


// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  /// error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.log(err);
        res.status(err.status || 500);
        res.send({status: false,message: err.message,
            error: err});
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({status: false,message: err.message,
        error: {}});
   
  });
module.exports = app;
