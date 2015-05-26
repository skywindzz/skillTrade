var app = angular.module('skillTrade');

app.controller('loginCtrl', function($scope, loginService){
	$scope.test = "test";
	//scope declaration
	// $scope.user = {};
	// $scope.user.email;
	// $scope.user.first;
	// $scope.user.last;
	// $scope.user.password;


	//login function
	$scope.login = function(){
		loginService.login($scope.user.email, $scope.user.password)
		.then(function(){
			redirectTo:'/dash'
		});
	}	

	//register function
	$scope.register = function(){
	loginService.register($scope.user)
	.then(function(){
		redirectTo:'/dash'
	});
	}
});