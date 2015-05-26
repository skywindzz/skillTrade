var app = angular.module('skillTrade');

app.service('loginService', function($http, $q){

	// this.register = function(user) {
	// 	var deferred = $q.defer();
	// 	$http ({
	// 		method: "POST",
	// 		url: '/api/users',
	// 		data: user
	// 	}).then(function(response){
	// 		deferred.resolve(response.data);
	// 	})
	// 	return deferred.promise;
	// }

	this.login = function(email, password){
		console.log("user in loginService", email, password);
		var deferred = $q.defer();
		$http ({
			method: "POST",
			url: '/api/login',
			data: {
				email : email,
				password : password
			}
		}).then(function(response){
			deferred.resolve(response.data);
		})
		return deferred.promise;
	}
}) 