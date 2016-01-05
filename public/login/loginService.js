var app = angular.module('skillTrade');
 
app.service('loginService', function($http, $q){

	this.register = function(user) {
		var deferred = $q.defer();
		$http ({
			method: "POST",
			url: '/api/users', 
			data: user
		}).then(function(response){
			deferred.resolve(response.data);
		})
		return deferred.promise;
	}

	this.login = function(user){
		console.log("user from loginService", user);
		var deferred = $q.defer();
		$http ({
			method: "POST",
			url: '/api/login/auth',
			data: user
		}).then(function(response){
			deferred.resolve(response.data);
			console.log(response.data);
		})
		return deferred.promise;
	}
}) 