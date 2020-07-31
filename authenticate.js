var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
//include jwt passport authen. startgey
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');


var config = require('./config');


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    //this will create a token and return it
    return jwt.sign(user, config.secretKey,
        { expiresIn: 86400 });

};
var opts = {};
//that how jwt will be xtracted from request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//json web token passport statraegy
exports.jwtPassport = passport.use('user',new JwtStrategy(opts,
    (jwt_payload, done) => {

        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {

            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

    exports.verifyUser = passport.authenticate('user', { session: false });