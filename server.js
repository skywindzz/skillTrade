//dependencies

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

app.use(passport.initialize()); //!!alert you need to initialize first before session!!
app.use(passport.session());




//passport local strategy 
passport.use(new LocalStrategy({
	usernameField: 'email'
  },
  function(email, password, done) {
    User.findOne({ email : email  }, function (err, user) {
      if(!user) {
        done(new Error('User doesn\'t exist'));
      }
      user.comparePassword(password).then(function(doesMatch){
        if (doesMatch) {
          return done(null, user);
        }
        else {
          done(new Error('please verify your password and try again'));
        }
      })
   });
  }
));

passport.serializeUser(function(user,done){  //needed 
  done(null, user._id)
});

passport.deserializeUser(function(id, done){  // changes needed hereß
  User.findById(id, function(err, user) {
    done(null, user);
  });
})

var requireAuth = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(401).end();
	}
	return next();
}
  
app.get('/api/profile/:id', function (req, res){
  console.log("Server.js", req.params.id)
  User.findById(req.params.id, function(err, result){
      console.log('userCtrl err', err);
      if (err) return status(500).send(err);
      res.send(result);
    })  
})
//endpoint for getting user data after login
app.get('/api/login/user', UserCtrl.getUser);

//endpoint for User op
app.get('/api/users', UserCtrl.get);
app.post('/api/users', UserCtrl.post);
app.put('/api/users/:id', UserCtrl.update);
app.delete('/api/users/:id', UserCtrl.delete);

//endpoint for dashboard operations
app.post('/api/users/skills', UserCtrl.addSkill);
app.post('/api/users/message', UserCtrl.newMessage);
app.post('/api/login/auth', 
  passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.end();
});

//endpoint for search result operations
app.get('/api/searchresultuser/:id',  function (req, res){
  console.log("Server.js searchresult", req.params.id)
  User.findById(req.params.id, function(err, result){
      if (err) return status(500).send(err);
      res.send(result);
    })  
})

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
//     User.findOne{ facebook.id : profile.id }, function (err, user) {
        // if(!user) {
        //   var user = new User();
        //   user.facebook.id = profile.id;
        //   user.save(function(err, new_user){
        //     if(err){
        //       console.log("can't create user", err);
        //     }
        //       done(null, new_user);
        //   })
        //   done(null,user);
        // }
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
//     res.redirect('/#/dash');
//   });

 -->


