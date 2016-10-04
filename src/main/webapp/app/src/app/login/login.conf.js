
function LoginConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index.login', {
            url: "/login",
            params: {},
            templateUrl: "login.tpl.html",
            controller: "LoginController as loginController",
            data: {pageTitle: 'Logowanie'}
        });
}

angular
    .module('rozrusznik')
    .config(LoginConfig);
