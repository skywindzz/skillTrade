var app = angular.module('skillTrade');

app.service('dashService', function($http, $q) {

	this.getUser = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/login/user'
	}).then(function(response){
		deferred.resolve(response.data)
	})
		return deferred.promise;
	}

// adding a link into search page once you add skill

	this.addSkill = function(skill) {
		var deferred = $q.defer();
		console.log('userskill from dashService', skill);
		$http({
			method: 'POST',
			url: '/api/users/skills',
			data : skill
		}).then(function(response){
			deferred.resolve(response.data);
		})
		return deferred.promise;
	}

 //get profile user from search link 

	this.getProfileUser = function(profileUser){
		console.log(profileUser);
    var deferred = $q.defer();
    $http({
      method : 'GET',
      url : "api/profile/" + profileUser
    }).then(function(response) {
      deferred.resolve(response.data);
    })
    return deferred.promise;
  }

// POST to two user id.. one to receiver and one to sender

	this.newMessage = function(message) {
		var deferred = $q.defer();
		console.log('Message from dashservice', message);
		$http({
			method: 'POST',
			url: 'api/users/message',
			data: message
		}).then(function(response){
			deferred.resolve(response.data);
		})
		return deferred.promise;
	}
    
    this.logout = function() {
        $http({
           method : 'GET',
           url : 'api/logout'
        }).then(function(response){
            console.log("you are logged out");
        })
    }
});

