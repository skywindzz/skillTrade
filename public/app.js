var app = angular.module('skillTrade', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
        templateUrl: 'index/homeTemp.html',
        controller: 'indexCtrl'
    })

    .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
    })

    .when('/dash', {
        templateUrl: 'dashboard/dash.html',
        controller: 'dashCtrl',
        resolve: {
            user: function(dashService) {
                return dashService.getUser();
            }
        }
    })

    .when('/dash/:id', {
        templateUrl: 'dashboard/dash.html',
        controller: 'dashCtrl',
        resolve: {
            user: function(dashService, $route) {
                return dashService.getProfileUser($route.current.params.id);
            }
        }
    })

    .when('/search', {
        templateUrl: 'search/search.html',
        controller: 'searchCtrl',
        resolve: {
            user: function(searchService) {
                return searchService.getUser();
            }
        }
    })

    .when('/searchresult/:id', {
        templateUrl: 'searchResult/searchResult.html',
        controller: 'searchResultCtrl',
        resolve: {
            searchUser: function(searchResultService, $route){
                return searchResultService.getSearchResultUser($route.current.params.id);
            }
        }
    })
    
    .when('/logout', {
        redirectTo: '/index/homeTemp.html'
    })
    
    .otherwise('/', {
        redirectTo: '/index/homeTemp.html'

    })
})
