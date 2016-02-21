'use strict';

/**
 * @ngdoc overview
 * @name bucketlistApp
 * @description
 * # bucketlistApp
 *
 * Main module of the application.
 */
angular
  .module('bucketlistApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage'
  ])
  .config(function ($routeProvider, $httpProvider, $localStorageProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

      $localStorageProvider.set('userInfo', { name: 'Munchie Boggie', photoURL: 'http://romston.com/wp-posts/13-05-13-Dog_and_his_Burger/Dog_and_his_Burger_Img01.jpg', id:1000, createdAt:"2016-02-20T22:52:33.000Z" });
  });