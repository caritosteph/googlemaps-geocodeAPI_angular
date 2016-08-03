(function () {
    'use strict';

    angular.module('app')
        .config(appConfig);

    function appConfig($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'location-data.html'
        })
        .state('map', {
          url: '/map',
          templateUrl: 'location-map.html',
          controller: 'MapCtrl',
          controllerAs: 'mc',
          params:{
            points: null
          }
        });
    }

})();
