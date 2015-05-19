var app = angular.module('skillTrade');

app.controller('loginCtrl', function($scope, loginService){
	//scope declaration

	$scope.email;
	$scope.firstName;
	$scope.lastName;
	$scope.password;

	//login function
	$scope.login = loginService.login;


	//register function
});