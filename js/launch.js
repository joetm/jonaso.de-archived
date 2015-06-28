/*global requirejs*/

//app namespace
var app = {};

requirejs.config({
    //default directory
    baseUrl: 'js',
    waitSeconds: 0,
    //cache buster for development
    //see: http://requirejs.org/docs/api.html#config-urlArgs
    urlArgs: "bust=" + (new Date()).getTime(),
    //path config for libraries
    paths: {
        //-vendor libraries-------------------
        'jquery': './vendor/jquery-2.1.3.min',
        'backbone': './vendor/backbone-min',
        'bootstrap': './vendor/bootstrap.min',
        'cbpAnimatedHeader': './vendor/cbpAnimatedHeader.min',
        'jqcloud': './vendor/jqcloud.min',
        'easing': './vendor/jquery.easing.min',
        'lazyload': './vendor/jquery.lazyload.min',
        'underscore': './vendor/underscore-min',
        'wow': './vendor/wow',
        'domReady': './vendor/requirejs/plugins/domReady/domReady',
        //------------------------------------
        //custom requireJS application modules
        'scripts': '../prod/js/scripts.min'
    },
    //use shim config to load modules in the correct order
    shim: {
        'domReady': ['scripts'],
        'backbone': ['underscore'], //backbone requires underscore
        'bootstrap': ['jquery'],
        'cbpAnimatedHeader': ['jquery'],
        'jqcloud': ['jquery'],
        'easing': ['jquery'],
        'lazyload': ['jquery']
    }
});


requirejs([
    "domReady", //function attributes are loaded until here
    "scripts"
], function (domReady) {
    'use strict';

    //only start when DOM is ready
    domReady(function () { //doc

        console.log('requirejs:domReady');
        console.log('------------------');

        console.log('Los geht die wilde Sause.');



        alert('ready');



    });//domReady(function ()

});//requirejs






