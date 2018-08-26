/*
 * This app will provide API for lan calls, to apify all internal services
 */
'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));
var swagger = require("swagger-node-express");
const passport = require('passport');

let log = require('../net2/logger.js')(__filename, 'info')

// periodically update cpu usage, so that latest info can be pulled at any time
let si = require('../extension/sysinfo/SysInfo.js');
si.startUpdating();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', require('mustache-express')());
app.set('view engine', 'mustache');
app.set('json spaces', 2);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var subpath_v1 = express();
app.use('/v1', subpath_v1);
subpath_v1.use(passport.initialize());
subpath_v1.use(passport.session());
subpath_v1.use(bodyParser.json());
subpath_v1.use(bodyParser.urlencoded({ extended: false }));
subpath_v1.use(require('./middlewares/auth'));

function enableSubPath(path, lib) {
  lib = lib || path;
  let r = require(`./routes/pro/${lib}.js`);
  subpath_v1.use("/" + path, r);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    log.error("[Developerment] Got error when handling request:", err, err.stack, {});
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  log.error("Got error when handling request: ", err, err.stack, {});
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
