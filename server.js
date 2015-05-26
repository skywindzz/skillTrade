//dependencies

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./app/models/User');

//check out facebook strategy and enter here
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

//others
var port = 8888;
var app = express();

//mongodb
var mongoUri = 'mongodb://localhost:27017/skilltrade';

//controllers
var UserCtrl = require('./app/controllers/userCtrl');

//middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

//passport setups
app.use(session({
	secret:'hailmary'
}));

//passport local strategy 
passport.use(new LocalStrategy({
	usernameField: 'email',
  passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ 'user.email' : email  }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
       console.log("user in passport.use", user);
      return done(null, user);
         });
  }
));

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



//endpoint for User op
// app.get('/api/users', UserCtrl.get);
// app.post('/api/users', UserCtrl.post);
// app.put('/api/users/:id', UserCtrl.update);
// app.delete('/api/users/:id', UserCtrl.delete);

// app.get('/login', UserCtrl.login)
app.post('/api/login', 
  passport.authenticate('local', { 
    failureRedirect: '/login', 
    sucessRedirect: '/dash'
  })
)
  

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function(){
	console.log('port running at ' + port);
});





//var facebookStrategy = require('passport-facebook');  optional

//Auth endpoints
//facebook strategy
// passport.use(new facebookStrategy({
//     clientID: '1579081739008594',
//     clientSecret: 'd1df25e3bac01a1be3ef30e80571f454',
//     callbackURL: "http://localhost:8888/auth/facebook/callback",
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log('profile', profile);
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     console.log('err', err);
//     console.log('user', user);  
//       return done(err, user);
//     });
//   }
// ));


// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//     function(req, res) {
//     res.redirect('./dashboard/dash.html');
//   });

 -->


