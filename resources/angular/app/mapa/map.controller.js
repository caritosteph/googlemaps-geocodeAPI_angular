(function () {
    'use strict';

    angular.module('map')
        .controller('MapCtrl', mapController);

    mapController.$inject = ['uiGmapGoogleMapApi','$stateParams','$state'];

    function mapController(uiGmapGoogleMapApi,$stateParams,$state){
      var mc = this;
      mc.points = $stateParams.points;
      mc.id = 0;
      mc.location = {center: {latitude: $stateParams.points.lat, longitude: $stateParams.points.lng }, zoom: 14 };
      mc.options = {scrollwheel: false};
      mc.dynamicMarkers = [];
      mc.goBack = goBack;

      function goBack(){
        $state.go("home");
      }
    }

})();
