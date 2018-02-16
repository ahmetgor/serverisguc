var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var linkedinOptions = {
  consumerKey: "86p3aqpfdryb6f",
  consumerSecret: "J3zZuknCc6B5M17o",
  // callbackURL: "http://127.0.0.1:8080/api/auth/callback"
  callbackURL: "https://isgucvarserver.herokuapp.com/api/auth/callback"
};

var linkedLogin = new LinkedInStrategy(linkedinOptions, function(token, tokenSecret, profile, done){
  console.log("linkedInstrategy");
  return done(err, profile);

});

passport.use('linkedin-login',linkedLogin);
