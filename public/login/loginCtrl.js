var app = angular.module('skillTrade');

app.controller('loginCtrl', function($scope, loginService, $location){

	//scope declaration
	$scope.user = {};
	$scope.user.email;
	$scope.user.first;
	$scope.user.last;
	$scope.user.password;
	//login function
	$scope.login = function(){
		loginService.login($scope.user)
		.then(function(){
			$location.path('/dash');
		}).catch(function(err){
			$scope.error = err;
		})
	}	

	//register function
	$scope.register = function(){
	loginService.register($scope.user)
	.then(function(){
		$scope.login();
	});
	}
});  