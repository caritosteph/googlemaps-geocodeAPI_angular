(function () {
    'use strict';

    angular
    .module('mcmakler')
    .factory('dataservice',dataservice);

    dataservice.$inject = ['$http','$q'];

    function dataservice($http,$q){

      return {
        getLocation: getLocation
      }

      function getLocation(address){
        var defered = $q.defer();
        var promise = defered.promise;
        var KEY = 'AIzaSyDT4Ja5wMRbmrP1HYjHxf5Ky9g1W4Jw9D4';
        var URL = "https://maps.googleapis.com/maps/api/geocode/json";

        var parameters = {
          address: address,
          key: KEY
        };
        var config = {
          params: parameters
        };

        $http.get(URL,config)
            .success(function(data) {
              var response = {};
              var successful = (data.status == 'OK')
              response.successful = successful
              if (successful){
                var location = data.results[0].geometry.location;
                response.location = location;
              }
              defered.resolve(response);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
      }
    }

})();
