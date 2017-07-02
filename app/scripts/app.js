'use strict';

/**
 * @ngdoc overview
 * @name exampleApp
 * @description
 * # exampleApp
 *
 * Main module of the application.
 */
 var api_path = 'http://localhost:8080/v1/'
angular
  .module('exampleApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/naves', {
        templateUrl: 'views/naves.html',
        controller: 'NavesCtrl',
        controllerAs: 'naves'
      })
      .when('/llorona', {
        templateUrl: 'views/llorona.html',
        controller: 'LloronaCtrl',
        controllerAs: 'llorona'
      })
      .when('/eludeAsteroides', {
        templateUrl: 'views/eludeasteroides.html',
        controller: 'EludeasteroidesCtrl',
        controllerAs: 'eludeAsteroides'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
