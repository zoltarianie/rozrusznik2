function VideoController($scope, $state, $rootScope, $translate, $location) {
    $scope.loginn = function() {
        $state.go("index.login");
    }
}

angular
    .module('rozrusznik')
    .controller('VideoController', VideoController);