var mongoose = require('mongoose');

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

	skills : {
				name : [ { type : String } ],
				level : String,
				description : [ {type : String} ]
			 }	
})

module.exports = mongoose.model('User', userSchema);