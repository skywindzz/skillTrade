var app = angular.module('skillTrade', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl:'index/homeTemp.html',
		controller: 'indexCtrl'
	})

	.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl'
	})

	.when('/dash', {
		templateUrl : 'dashboard/dash.html',
		controller : 'dashCtrl' 
	})

	.when('/search', {
		templateUrl : 'search/search.html',
		controller : 'searchCtrl'
	})

	.otherwise('/', {
		redirectTo: '/index/homeTemp.html'

	})
})