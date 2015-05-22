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
		console.log('req.body', req.body)
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
	}
}