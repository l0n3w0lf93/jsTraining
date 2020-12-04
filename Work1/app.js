var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/db');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//connect to db
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function () {
    console.log('Connected to Mongoose')
}).on('error', function (error) {
    console.log(error)
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


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
var users = require('./routes/users.js');
app.use('/users', users);

// Start the server
var port = 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});

module.exports = app;
