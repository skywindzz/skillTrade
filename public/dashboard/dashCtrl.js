var app = angular.module('skillTrade'); 

app.controller('dashCtrl', function($scope, $http, dashService, user){
  $scope.user = user;
  console.log($scope.user);


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
  $scope.newMessage = function(name, senderId, message){
    var message = {
        name : name,
        senderId : senderId,
        message : message
    }

  	dashService.newMessage(message).then(function(res){
  		console.log('message from dashCtrl', res);
      user.message.push(message);
      message = {};
      $scope.message = '';
  		$scope.user.message.push($scope.user);
  	})
  }

  //accordion jquery code

 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
}); 

