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
		templateUrl : 'dashboard/dash.html', // praram user id once log in
		controller : 'dashCtrl'
		// resolve : {
		// 	//add method execute before going to this route grab user object 
		// } 
	})

	.when('/search', {
		templateUrl : 'search/search.html',
		controller : 'searchCtrl'
	})

	.otherwise('/', {
		redirectTo: '/index/homeTemp.html'

	})
})