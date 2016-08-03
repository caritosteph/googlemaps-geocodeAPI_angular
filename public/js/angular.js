(function () {
    'use strict';

    angular.module('app', [
        // vendor packages
        // 'ngResource',
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'mcmakler',
        'toaster',
        'map'
    ]);

})();

(function () {
    'use strict';

    angular.module('map', [
      'uiGmapgoogle-maps'
    ]);

})();

(function () {
    'use strict';

    angular.module('toaster', []);

})();

(function () {
    'use strict';

    angular.module('mcmakler', []);

})();

(function () {
    'use strict';

    appConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
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

(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', appController)
    ;

    function appController()
    {
        
    }

})();

(function () {
    'use strict';

    appConfig.$inject = ["uiGmapGoogleMapApiProvider"];
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

(function () {
    'use strict';

    angular.module('toaster')
        .controller('ToasterCtrl', toasterController);

    toasterController.$inject = ['$mdToast','$mdDialog'];

    function toasterController($mdToast,$mdDialog){
      var tst = this;
      var isDlgOpen;
      tst.closeToast = function() {
        if (isDlgOpen) return;
        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
      };

      tst.openMoreInfo = function(e) {
        if ( isDlgOpen ) return;
        isDlgOpen = true;
        $mdDialog
          .show($mdDialog
            .alert()
            .title('More info goes here.')
            .textContent('Enter a correct address.')
            .ariaLabel('More info')
            .ok('Got it')
            .targetEvent(e)
          )
          .then(function() {
            isDlgOpen = false;
          })
      };

    }

})();

(function () {
    'use strict';

    angular
        .module('mcmakler')
    ;

})();

(function () {
    'use strict';

    angular
    .module('mcmakler')
    .controller('TestCtrl', testController);

    testController.$inject = ['$log','dataservice','$mdToast','$state'];

    function testController($log,dataservice,$mdToast,$state){

        var vm = this;
        vm.data = "hello";
        vm.radioData = [
          { label: 'Female', value: 'Female' },
          { label: 'Male', value: 'Male' }
        ];
        vm.checkitems = ["Hobby A"];
        vm.submit = getLocation;

        activate();

        function activate(){
            $log.debug('Hi! I\'m your test controller.');
        }

        function getLocation(project){

          if(typeof project === "undefined") {
            showToasterError()
            return;
          };
          var data = {
            postalcode : project.postalcode ? project.postalcode :"",
            city: project.city ? project.city:"" ,
            street: project.street? project.street: "",
            housenumber: project.housenumber ? project.housenumber:""
          }
          var address = data.postalcode+" "+data.city+" "+data.street+" "+data.housenumber;

          dataservice
          .getLocation(address)
          .then(function(data) {
            if(!data.successful){
              showToasterError();
            }else{
              $state.go('map', {points: data.location});
            }
          })
          .catch(function(err){

          });
        }

        function showToasterError(){
          $mdToast.show({
            hideDelay   : 3000,
            position    : 'top right',
            controller  : 'ToasterCtrl',
            controllerAs: 'tst',
            templateUrl : 'toast-template.html'
          });
        }
    }

})();

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJtYXBhL21hcC5tb2R1bGUuanMiLCJ0b2FzdGVyL3RvYXN0ZXIubW9kdWxlLmpzIiwibWNtYWtsZXIvbWNtYWtsZXIubW9kdWxlLmpzIiwiYXBwLmNvbmZpZy5qcyIsImFwcC5jb250cm9sbGVyLmpzIiwibWFwYS9tYXAuY29uZmlnLmpzIiwibWFwYS9tYXAuY29udHJvbGxlci5qcyIsInRvYXN0ZXIvdG9hc3Rlci5jb250cm9sbGVyLmpzIiwibWNtYWtsZXIvbWNtYWtsZXIuY29uZmlnLmpzIiwibWNtYWtsZXIvbWNtYWtsZXIuY29udHJvbGxlci5qcyIsIm1jbWFrbGVyL21jbWFrbGVyLnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLE9BQUE7OztRQUdBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7Ozs7QUNYQSxDQUFBLFlBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsT0FBQTtNQUNBOzs7OztBQ0pBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxXQUFBOzs7O0FDSEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLFlBQUE7Ozs7QUNIQSxDQUFBLFlBQUE7SUFDQTs7O0lBRUEsUUFBQSxPQUFBO1NBQ0EsT0FBQTs7SUFFQSxTQUFBLFVBQUEsZ0JBQUEsbUJBQUE7TUFDQSxtQkFBQSxVQUFBOztNQUVBO1NBQ0EsTUFBQSxRQUFBO1lBQ0EsS0FBQTtZQUNBLGFBQUE7O1NBRUEsTUFBQSxPQUFBO1VBQ0EsS0FBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLE9BQUE7WUFDQSxRQUFBOzs7Ozs7O0FDcEJBLENBQUEsWUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtTQUNBLFdBQUEsV0FBQTs7O0lBR0EsU0FBQTtJQUNBOzs7Ozs7QUNSQSxDQUFBLFlBQUE7SUFDQTs7O0lBRUEsUUFBQSxPQUFBO1NBQ0EsT0FBQTs7SUFFQSxTQUFBLFVBQUEsMkJBQUE7TUFDQSwyQkFBQSxVQUFBO1VBQ0EsS0FBQTtVQUNBLEdBQUE7VUFDQSxXQUFBO1VBQ0EsT0FBQTs7Ozs7O0FDWEEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1NBQ0EsV0FBQSxXQUFBOztJQUVBLGNBQUEsVUFBQSxDQUFBLHFCQUFBLGVBQUE7O0lBRUEsU0FBQSxjQUFBLG1CQUFBLGFBQUEsT0FBQTtNQUNBLElBQUEsS0FBQTtNQUNBLEdBQUEsU0FBQSxhQUFBO01BQ0EsR0FBQSxLQUFBO01BQ0EsR0FBQSxXQUFBLENBQUEsUUFBQSxDQUFBLFVBQUEsYUFBQSxPQUFBLEtBQUEsV0FBQSxhQUFBLE9BQUEsT0FBQSxNQUFBO01BQ0EsR0FBQSxVQUFBLENBQUEsYUFBQTtNQUNBLEdBQUEsaUJBQUE7TUFDQSxHQUFBLFNBQUE7O01BRUEsU0FBQSxRQUFBO1FBQ0EsT0FBQSxHQUFBOzs7Ozs7QUNsQkEsQ0FBQSxZQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1NBQ0EsV0FBQSxlQUFBOztJQUVBLGtCQUFBLFVBQUEsQ0FBQSxXQUFBOztJQUVBLFNBQUEsa0JBQUEsU0FBQSxVQUFBO01BQ0EsSUFBQSxNQUFBO01BQ0EsSUFBQTtNQUNBLElBQUEsYUFBQSxXQUFBO1FBQ0EsSUFBQSxXQUFBO1FBQ0E7V0FDQTtXQUNBLEtBQUEsV0FBQTtZQUNBLFlBQUE7Ozs7TUFJQSxJQUFBLGVBQUEsU0FBQSxHQUFBO1FBQ0EsS0FBQSxZQUFBO1FBQ0EsWUFBQTtRQUNBO1dBQ0EsS0FBQTthQUNBO2FBQ0EsTUFBQTthQUNBLFlBQUE7YUFDQSxVQUFBO2FBQ0EsR0FBQTthQUNBLFlBQUE7O1dBRUEsS0FBQSxXQUFBO1lBQ0EsWUFBQTs7Ozs7Ozs7QUNqQ0EsQ0FBQSxZQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBOzs7OztBQ0pBLENBQUEsWUFBQTtJQUNBOztJQUVBO0tBQ0EsT0FBQTtLQUNBLFdBQUEsWUFBQTs7SUFFQSxlQUFBLFVBQUEsQ0FBQSxPQUFBLGNBQUEsV0FBQTs7SUFFQSxTQUFBLGVBQUEsS0FBQSxZQUFBLFNBQUEsT0FBQTs7UUFFQSxJQUFBLEtBQUE7UUFDQSxHQUFBLE9BQUE7UUFDQSxHQUFBLFlBQUE7VUFDQSxFQUFBLE9BQUEsVUFBQSxPQUFBO1VBQ0EsRUFBQSxPQUFBLFFBQUEsT0FBQTs7UUFFQSxHQUFBLGFBQUEsQ0FBQTtRQUNBLEdBQUEsU0FBQTs7UUFFQTs7UUFFQSxTQUFBLFVBQUE7WUFDQSxLQUFBLE1BQUE7OztRQUdBLFNBQUEsWUFBQSxRQUFBOztVQUVBLEdBQUEsT0FBQSxZQUFBLGFBQUE7WUFDQTtZQUNBO1dBQ0E7VUFDQSxJQUFBLE9BQUE7WUFDQSxhQUFBLFFBQUEsYUFBQSxRQUFBLFlBQUE7WUFDQSxNQUFBLFFBQUEsT0FBQSxRQUFBLEtBQUE7WUFDQSxRQUFBLFFBQUEsUUFBQSxRQUFBLFFBQUE7WUFDQSxhQUFBLFFBQUEsY0FBQSxRQUFBLFlBQUE7O1VBRUEsSUFBQSxVQUFBLEtBQUEsV0FBQSxJQUFBLEtBQUEsS0FBQSxJQUFBLEtBQUEsT0FBQSxJQUFBLEtBQUE7O1VBRUE7V0FDQSxZQUFBO1dBQ0EsS0FBQSxTQUFBLE1BQUE7WUFDQSxHQUFBLENBQUEsS0FBQSxXQUFBO2NBQ0E7aUJBQ0E7Y0FDQSxPQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsS0FBQTs7O1dBR0EsTUFBQSxTQUFBLElBQUE7Ozs7O1FBS0EsU0FBQSxrQkFBQTtVQUNBLFNBQUEsS0FBQTtZQUNBLGNBQUE7WUFDQSxjQUFBO1lBQ0EsY0FBQTtZQUNBLGNBQUE7WUFDQSxjQUFBOzs7Ozs7O0FDNURBLENBQUEsWUFBQTtJQUNBOztJQUVBO0tBQ0EsT0FBQTtLQUNBLFFBQUEsY0FBQTs7SUFFQSxZQUFBLFVBQUEsQ0FBQSxRQUFBOztJQUVBLFNBQUEsWUFBQSxNQUFBLEdBQUE7O01BRUEsT0FBQTtRQUNBLGFBQUE7OztNQUdBLFNBQUEsWUFBQSxRQUFBO1FBQ0EsSUFBQSxVQUFBLEdBQUE7UUFDQSxJQUFBLFVBQUEsUUFBQTtRQUNBLElBQUEsTUFBQTtRQUNBLElBQUEsTUFBQTs7UUFFQSxJQUFBLGFBQUE7VUFDQSxTQUFBO1VBQ0EsS0FBQTs7UUFFQSxJQUFBLFNBQUE7VUFDQSxRQUFBOzs7UUFHQSxNQUFBLElBQUEsSUFBQTthQUNBLFFBQUEsU0FBQSxNQUFBO2NBQ0EsSUFBQSxXQUFBO2NBQ0EsSUFBQSxjQUFBLEtBQUEsVUFBQTtjQUNBLFNBQUEsYUFBQTtjQUNBLElBQUEsV0FBQTtnQkFDQSxJQUFBLFdBQUEsS0FBQSxRQUFBLEdBQUEsU0FBQTtnQkFDQSxTQUFBLFdBQUE7O2NBRUEsUUFBQSxRQUFBOzthQUVBLE1BQUEsU0FBQSxLQUFBO2dCQUNBLFFBQUEsT0FBQTs7O1FBR0EsT0FBQTs7Ozs7QUFLQSIsImZpbGUiOiJhbmd1bGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICAgICAvLyB2ZW5kb3IgcGFja2FnZXNcbiAgICAgICAgLy8gJ25nUmVzb3VyY2UnLFxuICAgICAgICAndWkucm91dGVyJyxcbiAgICAgICAgJ25nTWF0ZXJpYWwnLFxuICAgICAgICAnbmdNZXNzYWdlcycsXG4gICAgICAgICdtY21ha2xlcicsXG4gICAgICAgICd0b2FzdGVyJyxcbiAgICAgICAgJ21hcCdcbiAgICBdKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21hcCcsIFtcbiAgICAgICd1aUdtYXBnb29nbGUtbWFwcydcbiAgICBdKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ3RvYXN0ZXInLCBbXSk7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdtY21ha2xlcicsIFtdKTtcblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb25maWcoYXBwQ29uZmlnKTtcblxuICAgIGZ1bmN0aW9uIGFwcENvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcbiAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2xvY2F0aW9uLWRhdGEuaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdtYXAnLCB7XG4gICAgICAgICAgdXJsOiAnL21hcCcsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdsb2NhdGlvbi1tYXAuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ01hcEN0cmwnLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ21jJyxcbiAgICAgICAgICBwYXJhbXM6e1xuICAgICAgICAgICAgcG9pbnRzOiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAgICAuY29udHJvbGxlcignQXBwQ3RybCcsIGFwcENvbnRyb2xsZXIpXG4gICAgO1xuXG4gICAgZnVuY3Rpb24gYXBwQ29udHJvbGxlcigpXG4gICAge1xuICAgICAgICBcbiAgICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdtYXAnKVxuICAgICAgICAuY29uZmlnKGFwcENvbmZpZyk7XG5cbiAgICBmdW5jdGlvbiBhcHBDb25maWcodWlHbWFwR29vZ2xlTWFwQXBpUHJvdmlkZXIpe1xuICAgICAgdWlHbWFwR29vZ2xlTWFwQXBpUHJvdmlkZXIuY29uZmlndXJlKHtcbiAgICAgICAgICBrZXk6ICdBSXphU3lEVDRKYTV3TVJibXJQMUhZakh4ZjVLeTlnMVc0Snc5RDQnLFxuICAgICAgICAgIHY6ICczLjIwJywgLy9kZWZhdWx0cyB0byBsYXRlc3QgMy5YIGFueWhvd1xuICAgICAgICAgIGxpYnJhcmllczogJ3dlYXRoZXIsZ2VvbWV0cnksdmlzdWFsaXphdGlvbicsXG4gICAgICAgICAgY2hpbmE6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21hcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdNYXBDdHJsJywgbWFwQ29udHJvbGxlcik7XG5cbiAgICBtYXBDb250cm9sbGVyLiRpbmplY3QgPSBbJ3VpR21hcEdvb2dsZU1hcEFwaScsJyRzdGF0ZVBhcmFtcycsJyRzdGF0ZSddO1xuXG4gICAgZnVuY3Rpb24gbWFwQ29udHJvbGxlcih1aUdtYXBHb29nbGVNYXBBcGksJHN0YXRlUGFyYW1zLCRzdGF0ZSl7XG4gICAgICB2YXIgbWMgPSB0aGlzO1xuICAgICAgbWMucG9pbnRzID0gJHN0YXRlUGFyYW1zLnBvaW50cztcbiAgICAgIG1jLmlkID0gMDtcbiAgICAgIG1jLmxvY2F0aW9uID0ge2NlbnRlcjoge2xhdGl0dWRlOiAkc3RhdGVQYXJhbXMucG9pbnRzLmxhdCwgbG9uZ2l0dWRlOiAkc3RhdGVQYXJhbXMucG9pbnRzLmxuZyB9LCB6b29tOiAxNCB9O1xuICAgICAgbWMub3B0aW9ucyA9IHtzY3JvbGx3aGVlbDogZmFsc2V9O1xuICAgICAgbWMuZHluYW1pY01hcmtlcnMgPSBbXTtcbiAgICAgIG1jLmdvQmFjayA9IGdvQmFjaztcblxuICAgICAgZnVuY3Rpb24gZ29CYWNrKCl7XG4gICAgICAgICRzdGF0ZS5nbyhcImhvbWVcIik7XG4gICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgndG9hc3RlcicpXG4gICAgICAgIC5jb250cm9sbGVyKCdUb2FzdGVyQ3RybCcsIHRvYXN0ZXJDb250cm9sbGVyKTtcblxuICAgIHRvYXN0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRtZFRvYXN0JywnJG1kRGlhbG9nJ107XG5cbiAgICBmdW5jdGlvbiB0b2FzdGVyQ29udHJvbGxlcigkbWRUb2FzdCwkbWREaWFsb2cpe1xuICAgICAgdmFyIHRzdCA9IHRoaXM7XG4gICAgICB2YXIgaXNEbGdPcGVuO1xuICAgICAgdHN0LmNsb3NlVG9hc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzRGxnT3BlbikgcmV0dXJuO1xuICAgICAgICAkbWRUb2FzdFxuICAgICAgICAgIC5oaWRlKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlzRGxnT3BlbiA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdHN0Lm9wZW5Nb3JlSW5mbyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCBpc0RsZ09wZW4gKSByZXR1cm47XG4gICAgICAgIGlzRGxnT3BlbiA9IHRydWU7XG4gICAgICAgICRtZERpYWxvZ1xuICAgICAgICAgIC5zaG93KCRtZERpYWxvZ1xuICAgICAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgICAgIC50aXRsZSgnTW9yZSBpbmZvIGdvZXMgaGVyZS4nKVxuICAgICAgICAgICAgLnRleHRDb250ZW50KCdFbnRlciBhIGNvcnJlY3QgYWRkcmVzcy4nKVxuICAgICAgICAgICAgLmFyaWFMYWJlbCgnTW9yZSBpbmZvJylcbiAgICAgICAgICAgIC5vaygnR290IGl0JylcbiAgICAgICAgICAgIC50YXJnZXRFdmVudChlKVxuICAgICAgICAgIClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlzRGxnT3BlbiA9IGZhbHNlO1xuICAgICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ21jbWFrbGVyJylcbiAgICA7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdtY21ha2xlcicpXG4gICAgLmNvbnRyb2xsZXIoJ1Rlc3RDdHJsJywgdGVzdENvbnRyb2xsZXIpO1xuXG4gICAgdGVzdENvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvZycsJ2RhdGFzZXJ2aWNlJywnJG1kVG9hc3QnLCckc3RhdGUnXTtcblxuICAgIGZ1bmN0aW9uIHRlc3RDb250cm9sbGVyKCRsb2csZGF0YXNlcnZpY2UsJG1kVG9hc3QsJHN0YXRlKXtcblxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICB2bS5kYXRhID0gXCJoZWxsb1wiO1xuICAgICAgICB2bS5yYWRpb0RhdGEgPSBbXG4gICAgICAgICAgeyBsYWJlbDogJ0ZlbWFsZScsIHZhbHVlOiAnRmVtYWxlJyB9LFxuICAgICAgICAgIHsgbGFiZWw6ICdNYWxlJywgdmFsdWU6ICdNYWxlJyB9XG4gICAgICAgIF07XG4gICAgICAgIHZtLmNoZWNraXRlbXMgPSBbXCJIb2JieSBBXCJdO1xuICAgICAgICB2bS5zdWJtaXQgPSBnZXRMb2NhdGlvbjtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCl7XG4gICAgICAgICAgICAkbG9nLmRlYnVnKCdIaSEgSVxcJ20geW91ciB0ZXN0IGNvbnRyb2xsZXIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRMb2NhdGlvbihwcm9qZWN0KXtcblxuICAgICAgICAgIGlmKHR5cGVvZiBwcm9qZWN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBzaG93VG9hc3RlckVycm9yKClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcG9zdGFsY29kZSA6IHByb2plY3QucG9zdGFsY29kZSA/IHByb2plY3QucG9zdGFsY29kZSA6XCJcIixcbiAgICAgICAgICAgIGNpdHk6IHByb2plY3QuY2l0eSA/IHByb2plY3QuY2l0eTpcIlwiICxcbiAgICAgICAgICAgIHN0cmVldDogcHJvamVjdC5zdHJlZXQ/IHByb2plY3Quc3RyZWV0OiBcIlwiLFxuICAgICAgICAgICAgaG91c2VudW1iZXI6IHByb2plY3QuaG91c2VudW1iZXIgPyBwcm9qZWN0LmhvdXNlbnVtYmVyOlwiXCJcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGFkZHJlc3MgPSBkYXRhLnBvc3RhbGNvZGUrXCIgXCIrZGF0YS5jaXR5K1wiIFwiK2RhdGEuc3RyZWV0K1wiIFwiK2RhdGEuaG91c2VudW1iZXI7XG5cbiAgICAgICAgICBkYXRhc2VydmljZVxuICAgICAgICAgIC5nZXRMb2NhdGlvbihhZGRyZXNzKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKCFkYXRhLnN1Y2Nlc3NmdWwpe1xuICAgICAgICAgICAgICBzaG93VG9hc3RlckVycm9yKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgJHN0YXRlLmdvKCdtYXAnLCB7cG9pbnRzOiBkYXRhLmxvY2F0aW9ufSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2hvd1RvYXN0ZXJFcnJvcigpe1xuICAgICAgICAgICRtZFRvYXN0LnNob3coe1xuICAgICAgICAgICAgaGlkZURlbGF5ICAgOiAzMDAwLFxuICAgICAgICAgICAgcG9zaXRpb24gICAgOiAndG9wIHJpZ2h0JyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgIDogJ1RvYXN0ZXJDdHJsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RzdCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybCA6ICd0b2FzdC10ZW1wbGF0ZS5odG1sJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnbWNtYWtsZXInKVxuICAgIC5mYWN0b3J5KCdkYXRhc2VydmljZScsZGF0YXNlcnZpY2UpO1xuXG4gICAgZGF0YXNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCckcSddO1xuXG4gICAgZnVuY3Rpb24gZGF0YXNlcnZpY2UoJGh0dHAsJHEpe1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRMb2NhdGlvbjogZ2V0TG9jYXRpb25cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0TG9jYXRpb24oYWRkcmVzcyl7XG4gICAgICAgIHZhciBkZWZlcmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSBkZWZlcmVkLnByb21pc2U7XG4gICAgICAgIHZhciBLRVkgPSAnQUl6YVN5RFQ0SmE1d01SYm1yUDFIWWpIeGY1S3k5ZzFXNEp3OUQ0JztcbiAgICAgICAgdmFyIFVSTCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvblwiO1xuXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAga2V5OiBLRVlcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtZXRlcnNcbiAgICAgICAgfTtcblxuICAgICAgICAkaHR0cC5nZXQoVVJMLGNvbmZpZylcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICAgIHZhciBzdWNjZXNzZnVsID0gKGRhdGEuc3RhdHVzID09ICdPSycpXG4gICAgICAgICAgICAgIHJlc3BvbnNlLnN1Y2Nlc3NmdWwgPSBzdWNjZXNzZnVsXG4gICAgICAgICAgICAgIGlmIChzdWNjZXNzZnVsKXtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBkYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb247XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkZWZlcmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBkZWZlcmVkLnJlamVjdChlcnIpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
