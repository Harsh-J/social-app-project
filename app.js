var createError = require("http-errors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
var express = require("express");
var path = require("path");
var cors=require("cors")
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var authenticate = require("./authenticate");
var config = require("./config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var postsRouter = require("./routes/posts");
var commentRouter = require("./routes/commentRouter");

const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/posts");
const Comments = require("./models/comments");
const Likes = require("./models/likes");
const likeRouter = require("./routes/likeRouter");
const { resolveSoa } = require("dns");

const url = process.env.MONGODB_URI;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log("Connected Successfully to the server");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin:true}))

app.use(passport.initialize());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);

//app.use(express.static(path.join(__dirname, "insta/build")));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("insta/build"));
//   const path = require("path");
//   app.use("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "insta", "build", "index.html"));
//   });
// }
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
