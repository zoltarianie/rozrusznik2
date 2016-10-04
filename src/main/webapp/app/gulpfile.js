var gulp = require("gulp");

// Include Our Plugins
var concat = require("gulp-concat");
var ignore = require("gulp-ignore");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var del = require("del");
var path = require("path");
var order = require("gulp-order");
var gulpUtil = require("gulp-util");
var wiredep = require("wiredep");
var inject = require("gulp-inject");
var rename = require("gulp-rename");
var debug = require("gulp-debug");
var flatten = require('gulp-flatten');
var merge = require('merge-stream');
var html2js = require('gulp-html2js');
var watch = require('gulp-watch');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

// .pipe(concat('all.js'))
// .pipe(uglify())

// Get our conasfig!!
var config = require("./gulpfile.config.js");

var fontsCopy = function () {
    return gulp
        .src(config.fonts, { base: "." })
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./dist/fonts"));
};
var imagesCopy = function () {
    return gulp
        .src(config.images, { base: "./src" })
        .pipe(gulp.dest("./dist"));
};
var templateMargeAndCopy = function () {
    return gulp
        .src(config.template, { base: "." })
        .pipe(rename({dirname: ''}))
        .pipe(html2js('angular-template.js', {
            adapter: 'angular',
            base: '',
            name: 'templates-app'
        }))
        .pipe(gulp.dest('./dist/js/')).pipe(debug());
};
var scriptsCopy = function () {
    return gulp
     .src(config.js, { base: "." })
     .pipe(rename({dirname: ''}))
     .pipe(gulp.dest("./dist/js"));
};
var scriptsRelaseCopy = function () {
    return gulp
        .src(config.js, { base: "." })
        // .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./dist/js"));
};
var stylesCopy = function () {
    return gulp
        .src(config.css, { base: "." })
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./dist/style"));
};
var stylesRelaseCopy = function () {
    return gulp
        .src(config.css, { base: "." })
        .pipe(concat('all.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./dist/style"));
};
var lessCopy = function () {
    return gulp
        .src(config.less, { base: "." })
        .pipe(less())
        .pipe(rename({dirname: '', prefix: "less-"}))
        .pipe(gulp.dest('./dist/style'));
};
var lessRelaseCopy = function () {
    return gulp
        .src(config.less, { base: "." })
        .pipe(less())
        .pipe(rename({dirname: '', prefix: "less-"}))
        .pipe(concat('all-less.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/style'));
};
var copyFilesTask = function() {
    return merge(
        fontsCopy(),
        imagesCopy(),
        templateMargeAndCopy(),
        scriptsCopy(),
        stylesCopy(),
        lessCopy());
};
var relaseCopyFilesTask = function() {
    return merge(
        fontsCopy(),
        imagesCopy(),
        templateMargeAndCopy(),
        scriptsRelaseCopy(),
        stylesRelaseCopy(),
        lessRelaseCopy());
};
var injectTask = function () {
    var orderByArr = [].concat(config.js, config.css);
    for(var i=0; i < orderByArr.length; i++) {
        orderByArr[i] = "*/"+orderByArr[i].split("/").pop();
    }
    orderByArr.push('*/less-rozrusznik.css');

    return gulp
        .src("./src/index.html")
        .pipe(
            inject(
                gulp
                    .src(["./dist/**/*.{js,css}"], { read: false })
                    .pipe(order(orderByArr))
                , {ignorePath: 'dist', addRootSlash: false}
            )
        )
        .pipe(gulp.dest("./dist"));
};

gulp.task("clean", function (cb) {
    gulpUtil.log("Delete the build folder");
    return del(["./dist"], cb);
});

gulp.task('copyFiles', ["clean"], copyFilesTask);
gulp.task('copyRelaseFiles', ["clean"], relaseCopyFilesTask);

gulp.task("Build", ["copyFiles"], injectTask);
gulp.task("Relase", ["copyRelaseFiles"], injectTask);

gulp.task('Watch', function() {
    gulpUtil.log("Watching images, biznes, js, css, less, template.");

    gulp.src(config.images, { base: "./src" })
        .pipe(watch(config.images, { base: "./src" })).pipe(debug())
        .pipe(gulp.dest("./dist"));

    gulp.src(config.js, { base: "." })
        .pipe(watch(config.js, { base: "." })).pipe(debug())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./dist/js"));

    gulp.src(config.css, { base: "." })
        .pipe(watch(config.css, { base: "." })).pipe(debug())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./dist/style"));

    gulp.src(config.less, { base: "." })
        .pipe(watch(config.less, { base: "." })).pipe(debug())
        .pipe(less())
        .pipe(rename({dirname: '', prefix: "less-"}))
        .pipe(gulp.dest('./dist/style'));

    gulp.watch(config.template, templateMargeAndCopy);

    var scriptsAndStyles = [].concat(config.less, config.css, config.js);
    var distNewFile = function watcher(event){
        if(event.type === 'added' || event.type === 'deleted') {
            injectTask();
        }
    };
    gulp.watch(scriptsAndStyles, distNewFile);
});