var app = angular.module('skillTrade');

app.controller('searchCtrl', function($scope, $http, dashService, user) {
	   $scope.users = user;
	   $scope.skills = user.skills;
	   console.log("from serachCtrl", $scope.users);
})