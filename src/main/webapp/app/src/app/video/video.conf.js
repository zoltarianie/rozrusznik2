function VideoConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index.video', {
            url: "/video",
            params: {},
            templateUrl: "video.tpl.html",
            controller: "VideoController as videoController",
            data: {pageTitle: 'Video'}
        });
}

angular
    .module('rozrusznik')
    .config(VideoConfig);
