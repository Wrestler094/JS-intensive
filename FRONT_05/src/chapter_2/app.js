var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const sessions = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
var apiOrderRouter = require('./routes/apiorder');
var orderIdRouter = require('./routes/orderid');
var waiterRouter = require('./routes/waiter');
var signInRouter = require('./routes/signin');
var signUpRouter = require('./routes/signup');

var app = express();

const oneDay = 1000 * 60 * 60 * 24;
// var session;
// app.use(sessions({
//   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//   saveUninitialized:true,
//   cookie: { maxAge: oneDay },
//   resave: false
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/order/api', apiOrderRouter);
app.use('/order/', orderIdRouter);
app.use('/waiter', waiterRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
