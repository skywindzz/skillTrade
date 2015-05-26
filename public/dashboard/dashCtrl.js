var app = angular.module('skillTrade');

app.controller('dashCtrl', function($scope, $q, $http, dashService){

 dashService.getUserName().then(function(result){
 		$scope.username = result;
 });
}); 