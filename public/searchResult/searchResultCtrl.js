var app = angular.module('skillTrade');

app.controller('searchResultCtrl', function ($scope, $http, $routeParams, searchResultService, searchUser) {
    $scope.user = searchUser;
    console.log($scope.user);
    console.log("hello world")

    $scope.newMessage = function (message) {
        var message = {
            message: message
        }

        searchResultService.newMessage(message).then(function (res) {
            console.log('message from searchResultCtrl', res);
            searchUser.message.push(message);
            $scope.message = '';
        })
    }

    $scope.logout = function () {
        searchResultService.logout();
    }
    /* write a function use searchID and go back to
    fill get user using searchID
     /* write a function that takes you back to 
   your homepage if you click dashboard */
})