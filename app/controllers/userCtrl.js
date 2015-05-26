var User = require('../models/User');
  
module.exports = {

	get: function(req, res) {
			console.log('req.query:', req.query);
			User.find(req.query)
			.exec(function(err, result){
			if (err) return status(500).send(err);
			res.send(result);
		})
	},


	post: function(req, res) {
		console.log(req.body);
		var newUser = new User(req.body);
		newUser.save(function(err, result){
			if(err) return res.status(500).send(err);
			res.send(result);
		});
	},

	update: function(req, res) {
		User.findByIdAndUpdate(req.params.id, req.body, function(err, result){
			if (err) return res.status(500).send(err);
			res.send(result);
		});
	},

	delete: function(req, res) {
		User.findByIdAndRemove(req.params.id, function(err, result){
			if(err) return res.status(500).send(err);
			res.send(result);
		});
	},

	login: function(req, res) {
		User.findOne({email: req.query.email}, function(err, user){
			console.log(user);
			if(err) return res.status(500).end(err);
			if(user){

				user.comparePassword(req.query.password, function(err, isMatch){
					console.log(isMatch);
					if (isMatch) {
					res.redirect('/#/dash');
				}
				})
			}
		})
	}
}