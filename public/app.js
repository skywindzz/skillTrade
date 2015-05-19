var app = angular.module('skillTrade', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider

	.when('/', {
		controller: 'indexCtrl'
	})

	.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl'
	})

	.otherwise({
		redirectTo: '/'

	})
})