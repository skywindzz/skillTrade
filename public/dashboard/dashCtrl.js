var app = angular.module('skillTrade'); 

app.controller('dashCtrl', function($scope, $http, dashService, user){
  $scope.user = user;
  console.log($scope.user);
  console.log($scope.user.message);
// MISSING FUNCTION: adding skill will also add that skill into the search page
  
  $scope.addSkill = function(skillsName, skillsLevel, skillsDescription){
  	var skill = { 
  			name : skillsName,
  			level : skillsLevel,
  			description : skillsDescription
  	}

  	dashService.addSkill(skill).then(function(res){
  		console.log('skill from dashCtrl', res);
  		user.skills.push(skill);
      $scope.skills = {};
      $scope.skillsName = '';
      $scope.skillsDescription = '';
  	})
  }

 
// MISSING FUNCTION: function that adds message to the sender and receiver's message array
  $scope.newMessage = function(message){
    var message = {
        message : message
    }

  	dashService.newMessage(message).then(function(res){
  		console.log('message from dashCtrl', res);
      user.message.push(message);
      $scope.message = '';
  	})
  }

  $scope.logout = function() { 
     dashService.logout();
  }
//file uploads
// $scope.$watch('files', function(){
//   $scope.upload($scope.files);
// });

//accordion jquery code
   angular.element(document).ready(function(){
      angular.element('.collapsible').collapsible({
      accordion : false  // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
})


 