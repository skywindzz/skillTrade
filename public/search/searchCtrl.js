var app = angular.module('skillTrade');

app.controller('searchCtrl', function($scope, $http, searchService, user) {
	   $scope.users = user;
	   $scope.skills = user.skills;
	   console.log($scope.users);

	   $scope.background = "http://www.pageresource.com/wallpapers/wallpaper/night-tokyo-related-keywords_334045.jpg"

	
})