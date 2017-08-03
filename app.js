const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks')
const index = require('./routes/index');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session)
const app = express();
mongoose.connect('localhost:27017/shopping-data')
// require('./passport/passport.js')
nunjucks.configure('views',{
    autoescape: true,
    cache: false,
    express: app,
    watch: true
})
app.use(flash());

app.use('/', express.static(path.join(__dirname,'public')));
app.engine('html', nunjucks.render);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store:new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie:{ maxAge:180 * 60 * 1000 }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  // res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/',index)

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  // var token =req.csrfToken();
  // res.cookie('XSRF-TOKEN', token);
  // res.locals.csrfToken = token;
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
//   res.render('error');
});

module.exports = app;
