var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    //batch = require('gulp-batch'),
    //less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    //clean = require('gulp-clean'), //deprecated in favor of del
    //del = require('del'),
    rename = require('gulp-rename'),
    //gutil = require('gulp-util'),
    jslint = require('gulp-jslint'),
    sourcemaps = require('gulp-sourcemaps');


//clean build directory
//gulp.task('cleanjs', function () {
//    return gulp.src('build/js/*', {read: false})
//        .pipe(clean());
//});
//gulp.task('cleancss', function () {
//    return gulp.src('build/css/*', {read: false})
//        .pipe(clean());
//});
//gulp.task('cleanjs', function (cb) {
//    del('build/js/*.js', cb);
//});
//gulp.task('cleancss', function (cb) {
//    del('build/css/*.css', cb);
//});

//check js
gulp.task('jslint', function () {
    return gulp.src(['js/app.js'])
    .pipe(jslint({
        errorsOnly: false
    }))
    .on('error', function (error) {
        console.error(String(error));
    });
});

//uglify
gulp.task('compressjs', function() {
    //del('build/js/*.js');
    gulp.src(
        'js/app.js'
    )
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('js'));
});

//concatjs
gulp.task('concatjs', function() {
    return gulp.src([
        'js/vendor/jquery-2.1.3.min.js', //requireJS requires this to be separate
        'js/vendor/underscore-min.js',
        'js/vendor/backbone-min.js',
        'js/vendor/jquery.lazyload.min.js',
        'js/vendor/bootstrap.min.js',
        'js/vendor/cbpAnimatedHeader.min.js',
        'js/agency.min.js',
        'js/vendor/mustache/mustache.min.js',
        'js/vendor/jqcloud.min.js',
        'js/vendor/jquery.easing.min.js',
        'js/vendor/wow.min.js',
        //'js/vendor/slick.min.js',
        'js/app.min.js'
    ])
    //.pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('prod/js'));
});


//javascript tasks
gulp.task('js', ['compressjs', 'concatjs']); //jslint


//concatcss
gulp.task('concatcss', function() {
    //del('build/css/*.css');
    return gulp.src([
        './css/font-awesome.min.css',
        './css/grav.css',
        './css/jqcloud.min.css',
        //'./css/slick.css',
        //'./css/slick-theme.css',
        './css/style.css',
        './css/animate.css'
    ])
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./prod/css/'));
});

//css tasks
gulp.task('css', ['concatcss']);


//watch
gulp.task('watch', ['js', 'css'], function () {
    gulp.watch("css/*.css", ['css']);
    gulp.watch("js/*.js", ['js']);
});
