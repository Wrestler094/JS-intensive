var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var vacanciesRouter = require('./routes/vacancies');
var vacanciesIdRouter = require('./routes/vacanciesId');
var activeVacanciesRouter = require('./routes/activeVacancies');
var activeVacanciesIdRouter = require('./routes/activeVacanciesId');

var app = express();
app.options("*", cors({ origin: 'http://localhost:3001', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/vacancies', vacanciesRouter);
app.use('/vacancies/', vacanciesIdRouter);
app.use('/active-vacancies', activeVacanciesRouter);
app.use('/active-vacancies/', activeVacanciesIdRouter);

module.exports = app;
