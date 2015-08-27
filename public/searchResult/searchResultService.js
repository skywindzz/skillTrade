var app = angular.module('skillTrade');

app.service('searchResultService', function($http, $q) {
	this.getSearchResultUser = function(searchUser){
		console.log(searchUser);
    var deferred = $q.defer();
    $http({
      method : 'GET',
      url : "api/searchresultuser/" + searchUser
    }).then(function(response) {
      deferred.resolve(response.data);
    })
    return deferred.promise;
  }
})