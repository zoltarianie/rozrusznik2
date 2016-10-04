
function MainConfig($stateProvider, $urlRouterProvider, HateoasInterceptorProvider) {
    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            controller: "MainController as mainController",
            templateUrl: "main.tpl.html"
        });
    HateoasInterceptorProvider.transformAllResponses();
}

angular
    .module('rozrusznik')
    .config(MainConfig)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
        $state.go("index.video");
});

angular
    .module('rozrusznik').config(function($urlRouterProvider){
    // if the path doesn't match any of the urls you configured
    // otherwise will take care of routing the user to the specified url
    $urlRouterProvider.otherwise('/index');

    // Example of using function rule as param
    $urlRouterProvider.otherwise(function($injector, $location){
        c($injector);
        c($location);
    });
})