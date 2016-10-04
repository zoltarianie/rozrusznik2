var bower = "bower_components/";
var src = "src/";
var app = "app/";

var config = {
    fonts: [
        bower + "fontawesome/fonts/*.*",
        bower + "bootstrap/fonts/*.*"
    ],
    images: [
        bower + "leaflet/dist/images/**/*.{gif,jpg,png}",
        src + "images/**/*.{gif,jpg,png,ico}"
    ],
    js: [
        bower + "jquery/dist/jquery.min.js",
        bower + "jquery-ui/jquery-ui.min.js",
        bower + "angular/angular.min.js",
        bower + "angular-ui-router/release/angular-ui-router.min.js",
        bower + "angular-translate/angular-translate.min.js",
        bower + "angular-resource/angular-resource.min.js",
        bower + "angular-sanitize/angular-sanitize.min.js",
        bower + "angular-hateoas/src/angular-hateoas.js",
        bower + "ngstorage/ngStorage.min.js",
        bower + "leaflet/dist/leaflet.js",
        bower + "moment/moment.js",
        bower + "angular-base64-upload/dist/angular-base64-upload.min.js",
        bower + "slimScroll/jquery.slimscroll.min.js",
        bower + "angular-animate/angular-animate.min.js",
        src + "scripts/**/*.{ts,js.map,js}",
        src + "app/**/*.{js,conf,ctlr,svc}"
    ],
    less: [
        src + "less/*.less",
        src + "common/*.less",
        src + "app/**/*.less"
    ],
    css: [
        bower + "bootstrap/dist/css/bootstrap.min.css",
        bower + "fontawesome/css/font-awesome.min.css",
        bower + "leaflet/dist/leaflet.css",
        src + "less/sk-circle.css",
        src + "less/custom-inputs.css"
    ],
    template: [
        src + "app/**/*.{tpl,html}",
        src + "common/*.{tpl,html}"
    ],
    bootFile: app + "index.html"
};

module.exports = config;