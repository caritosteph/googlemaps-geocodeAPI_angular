(function () {
    'use strict';

    angular.module('map')
        .config(appConfig);

    function appConfig(uiGmapGoogleMapApiProvider){
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyDT4Ja5wMRbmrP1HYjHxf5Ky9g1W4Jw9D4',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization',
          china: true
      });
    }

})();
