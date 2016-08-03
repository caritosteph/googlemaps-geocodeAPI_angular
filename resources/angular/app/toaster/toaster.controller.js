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
