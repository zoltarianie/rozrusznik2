function LoginController($scope, LoginService, $state, $rootScope, $translate, $location) {
    var authenticateOk = function(account) {
        c("var authenticateOk = function(account) {");
        c(account);
    };
    var authenticateErr = function(data) {
        c("var authenticateErr = function(data) {");
        c(data);
    };
    var authenticate = function() {
        c("var authenticate = function() {");
        LoginService.authenticate().then(authenticateOk,authenticateErr);
    };

    var loginOk = function(data) {
        c("var loginOk = function(data) {");
        c(data);

        authenticate();
    };
    var loginErr = function(data) {
        c("var loginErr = function(data) {");
        c(data);
    };
    $scope.login = function() {
        c("$scope.login = function() {");
        LoginService.login($scope.accountUsername, $scope.accountPassword).then(loginOk, loginErr);
    };

    // authenticate();
}

angular
    .module('rozrusznik')
    .controller('LoginController', LoginController);