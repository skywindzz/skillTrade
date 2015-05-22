//dependencies

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var facebookStrategy = require('passport-facebook');

//check out facebook strategy and enter here
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//others
var port = 8888;
var app = express();

//mongodb
var mongoUri = 'mongodb://localhost:27017/skilltrade';

//controllersß
var UserCtrl = require('./app/controllers/userCtrl');

//middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

//passport setups
app.use(session({
	secret:'hailmary'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user,done){
	done(null, user)
});
passport.deserializeUser(function(obj, done){
	done(null, obj)
});

var requireAuth = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

//facebook strategy
passport.use(new facebookStrategy({
    clientID: '1579081739008594',
    clientSecret: 'd1df25e3bac01a1be3ef30e80571f454',
    callbackURL: "http://localhost:8888/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

//Auth endpoints

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/'); //now it redirect to home but I want to redirect it to user dashboard,ask mentor
  });

//endpoint for User op
app.get('api/users', UserCtrl.get);
app.post('/api/users', UserCtrl.post);
app.put('/api/users/:id', UserCtrl.update);
app.delete('/api/users/:id', UserCtrl.delete);

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function(){
	console.log('port running at ' + port);
});
