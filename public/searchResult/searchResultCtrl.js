var app = angular.module('skillTrade');

app.controller('searchResultCtrl', function($scope, $http, $routeParams, searchResultService, searchUser){
		$scope.user = searchUser;
		console.log($scope.user);
		console.log("hello world")

		/* write a function use searchID and go back to
		fill get user using searchID
		 /* write a function that takes you back to 
	   your homepage if you click dashboard */	
})