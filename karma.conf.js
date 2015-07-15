// Karma configuration
// Generated on Wed Jul 15 2015 17:39:18 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
        'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
        //{pattern: 'prod/js/*.js', watched: true, served: true, included: true},
        {pattern: 'js/vendor/jquery-2.1.3.min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/underscore-min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/backbone-min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/jquery.lazyload.min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/bootstrap.min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/cbpAnimatedHeader.min.js', watched: false, served: true, included: true},
        {pattern: 'js/agency.min.js', watched: true, served: true, included: true},
        {pattern: 'js/vendor/mustache/mustache.min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/jqcloud.min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/jquery.easing.min.js', watched: false, served: true, included: true},
        {pattern: 'js/vendor/wow.min.js', watched: false, served: true, included: true},
        {pattern: 'prod/css/*.css', watched: true, served: true, included: true},
        {pattern: 'data/**/*.json', watched: true, served: true, included: false},
        {pattern: 'views/**/*.htm', watched: true, served: true, included: false},
        {pattern: 'fonts/*.*', watched:false, served: true, included: false},
        {pattern: 'icons/*.*', watched:false, served: true, included: false},
        //{pattern: 'token.php', watched: true, served: true, included: true},
        {pattern: 'js/agency.js', watched: true, served: true, included: true},
        {pattern: 'js/app.js', watched: true, served: true, included: true},
        'test/**/*Spec.js'
    ],
    // list of files to exclude
    exclude: [
      'js/vendor/**/test/*.js',
      'js/vendor/**/node_modules/*.js'
    ],

    /*
    plugins: [
    ],
    */

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'js/**/*.js': 'coverage',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
        'progress',
        'coverage'
    ],

    //see https://github.com/karma-runner/karma-coverage
    coverageReporter: {
        type : 'lcov',
        dir : 'test/coverage/',
        subdir: function (browser) {
            return browser.toLowerCase().split(/[ /-]/)[0];
        }
    },

    // web server port
    port: 9875,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'Firefox'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false

  });
}
