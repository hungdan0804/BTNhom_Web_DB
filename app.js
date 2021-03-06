let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mysql=require('mysql');
let db = require('./utils/Database');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');
const cartRouter = require('./routes/cart.js');
const checkoutRouter = require('./routes/checkout');
const passport=require('passport');
let expressSession = require('express-session');
let app = express();
let hbs = require('./utils/HandlebarsHelper.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'keyboard cat',resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  if(req.user){
    if(req.user.is_active !=0) {
      res.locals.user = req.user || null;
    }else{
      res.locals.email=req.user.email;
      res.locals.username=req.user.username;
      res.render('confirm_email');
      req.logout();
    }
  }
  next();
});
app.use('/',indexRouter);
app.use('/user', usersRouter);
app.use('/shop',shopRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
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
