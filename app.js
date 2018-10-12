let createError = require('http-errors');
let express = require('express');


let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let goodsRouter = require('./routes/goods');

let app = express();

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //必须重新设置，把origin的域加上去
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-access-token');
    res.header('Access-Control-Allow-Credentials', 'true');//和客户端对应，必须设置以后，才能接收cookie.
    next();
};

app.use(allowCrossDomain);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
