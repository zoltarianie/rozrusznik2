
function LoginService($http, $resource, $rootScope, $state, $timeout) {
    var service = {};

    service.logout = function () {
        return($http.post("/rozrusznik/logout", {}));
    };

    service.authenticate = function () {
        var resource = $resource("/rozrusznik/account", {});
        return(resource.get().$promise);
    };

    service.remindPassword = function (email) {
        var resource = $resource("/rozrusznik/account/remindPassword", {});
        return(resource.get({"email": email}).$promise);
    };

    service.login = function (accountUsername, accountPassword) {
        var req = {
            method: 'POST',
            url: '/rozrusznik/login',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({ username: accountUsername, password: accountPassword })
        };
        return($http(req));
    };

    service.rgister = function (username, password) {
        var resource = $resource("/rozrusznik/account/rgister", {});
        return(resource.get({"username": username, password: password}).$promise);
    };

    service.changePassword = function (data) {
        var newPassword = {
            old: data.old,
            new: data.new,
            repeat: data.repeat
        };
        var resource = $resource("/rozrusznik/account/changePassword", {});
        return(resource.get(newPassword).$promise);
    };

    service.resource401 = function (data) {
        if (data && data.status === 401) {
            service.logout().then(function() {
                $state.go("index.login");
            });
        }
    };

    return service;
}

angular
    .module('rozrusznik')
    .factory('LoginService', LoginService);