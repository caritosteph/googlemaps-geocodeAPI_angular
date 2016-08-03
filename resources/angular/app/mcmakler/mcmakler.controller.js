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
