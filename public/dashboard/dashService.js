var app = angular.module('skillTrade');

app.service('dashService', function($http, $q){
	var deferred = $q.defer();
	var url = '/api/users';
	var userName = '';

	this.getUserName = function(){
		$http({
		method: 'GET',
		url: url
	}).then(function(response){
		deferred.resolve(response.data);
	})
		return deferred.promise;
	}		
});

