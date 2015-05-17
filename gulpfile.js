var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    //batch = require('gulp-batch'),
    //less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    //clean = require('gulp-clean'), //deprecated in favor of del
    del = require('del'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
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
gulp.task('cleanjs', function (cb) {
    del('build/js/*.js', cb);
});
gulp.task('cleancss', function (cb) {
    del('build/css/*.css', cb);
});

//uglify
gulp.task('compressjs', function() {
    gulp.src(
        'js/app.js'
    )
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('build/js'));
});

//concatjs
gulp.task('concatjs', function() {
    return gulp.src([
        'js/jquery-2.1.3.min.js',
        'js/jquery.lazyload.min.js',
        'js/bootstrap.min.js',
        'js/jquery.easing.min.js',
        'js/classie.min.js',
        'js/cbpAnimatedHeader.min.js',
        'js/agency.min.js',
        'build/js/app.min.js'
    ])
    .pipe(concat('scripts.min.js'))
    //.pipe(sourcemaps.init())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('prod/js'));
});


//javascript tasks
gulp.task('js', ['cleanjs', 'compressjs', 'concatjs']);


//concatcss
gulp.task('concatcss', function() {
  return gulp.src([
        './css/font-awesome.min.css',
        './css/grav.css',
        './css/style.css'
    ])
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./prod/css/'));
});

//css tasks
gulp.task('css', ['cleancss', 'concatcss']);


//watch
gulp.task('watch', ['js', 'css'], function () {
    gulp.watch("css/*.css", ['css']);
    gulp.watch("js/*.js", ['js']);
});
