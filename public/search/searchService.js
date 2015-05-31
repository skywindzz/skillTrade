var app = angular.module('skillTrade');

app.service('searchService', function($http, $q){

	this.getUser = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url : '/api/users'
		}).then(function(response) {
			deferred.resolve(response.data);
		})
		return deferred.promise;
	}


	
	//write a function here concatonate a link with user id and take current user into that 
	//skill owner's profile 
})