var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport=require('passport');
var authenticate=require('./authenticate');
var config=require('./config');
const PORT=process.env.PORT || 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var postsRouter=require('./routes/posts');
var commentRouter=require('./routes/commentRouter');

const mongoose=require('mongoose');
const User=require('./models/user');
const Post=require('./models/posts');
const Comments=require('./models/comments');
const Likes=require('./models/likes');
const likeRouter = require('./routes/likeRouter');

const url=config.mongouri;
const connect=mongoose.connect(url);

connect.then((db)=>{

  console.log('Connected Successfully to the server');

},(err)=>{console.log(err)});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts',postsRouter);
app.use('/comments',commentRouter);
app.use('/likes',likeRouter);

app.use(express.static(path.join(__dirname, 'public')));


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

if(process.env.NODE_ENV=="production"){
  app.use(express.static('insta/build'))
  const path=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'insta','build','index.html'))
  })
}

app.listen(PORT,()=>{
  console.log('Server is running on port',PORT);
})

module.exports = app;
