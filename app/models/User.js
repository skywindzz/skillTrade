var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	
	first : {	type : String, 
				required : true
			},

	last : {	type : String, 
				required :true
			},
		  

	email : {	type : String, 
				unique : true,
				required : true
			},

	password : { type : String,
				 required : true
			},
	
	rating : { type : Number, 
				min : 0,
				max : 5
			 },

	skills : [
				{
					name : { type : String},
					level : { type : String, 
					 		  enum : ['beginner', 'intermediate', 'expert']},
					description : {type : String} 
			 	}
			 ],
	message: 	[
					{
						name : { type: String },
						senderId : { type : mongoose.Schema.Types.ObjectId, ref : 'User'},
						message : { type : String }
					}
				]		 	
})

userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err,hash) {
			if (err) return next(err);

			user.password = hash;
			next(); 
		});
	});
});	

userSchema.methods.comparePassword = function(candidate, cb){
	var user = this;
	bcrypt.compare(candidate, this.password, function(err, isMatch){
		if (err) return cb(err);
        	cb(null, isMatch);
	})
}



module.exports = mongoose.model('User', userSchema);