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
  .config(function ($routeProvider, $httpProvider, $localStorageProvider) {
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

      $localStorageProvider.set('userInfo', { photoURL: "https://scontent.flis1-1.fna.fbcdn.net/hphotos-xpa1/v/t1.0-9/11181849_984802091532539_3862292596095526118_n.jpg?oh=7ef55512a7f5048044eb6b1a7b1795e9&oe=5754E5C9",
                                              name: "Miguel Poeira",
                                              email: "miguelfcunha@gmail.com",
                                              password: "password",
                                              id: 1,
                                              createdAt: "2016-02-20T22:52:33.000Z",
                                              updatedAt: "2016-02-20T22:52:33.000Z" 
                                            });
  });