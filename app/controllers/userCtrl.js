var User = require('../models/User');
  
module.exports = {

	get: function(req, res) {
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
		User.findByIdAndUpdate(req.params._id, req.body, function(err, result){
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


	addSkill: function(req, res) { 
		console.log(req.user);
		User.findByIdAndUpdate(req.user._id, {$push: { "skills" : req.body}}, {new : true},
			function(err, result){
			if(err) return res.status(500).send(err);
			res.send(result);
		})
	},

	newMessage: function(req, res) {
		console.log(req.message);
		User.findByIdAndUpdate(req.user._id, {$push: {"message" : req.body}}, {new : true},
			function(err, result){
			if(err) return res.status(500).send(err);	
			res.send(result);
		})
	},

	getProfileUser: function(req, res) {
		console.log(req.params);
		User.findById(req.params.id, function(err, result){
			console.log('userCtrl err', err);
			if (err) return status(500).send(err);
			res.send(result);
		})
	},


	getUser: function(req, res) {
		return res.send(req.user);
	}
}