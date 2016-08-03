var gulp = require('gulp'),
    elixir = require('laravel-elixir')
    ;

var config = elixir.config;
config.assetsPath = 'resources';

require('./tasks/angular.task.js');
//elixir.config.sourcemaps = false;

elixir(function (mix) {

    mix
        // bootstrap
        .copy('bower_components/bootstrap/dist/css/*.min.css', 'resources/css/bootstrap.min.css')
        .copy('bower_components/angular-material/angular-material.min.css', 'resources/css/angular-material.min.css')
        .copy('bower_components/bootstrap/dist/fonts', 'public/fonts')

        // sass
        .sass('style.scss')

        // angular
        .angular([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/*.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/*min.js',
            'bower_components/angular-animate/*min.js',
            'bower_components/angular-aria/*min.js',
            'bower_components/angular-resource/*min.js',
            'bower_components/angular-material/*min.js',
            'bower_components/angular-messages/*min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
            'bower_components/angular-google-maps/dist/angular-google-maps.min.js'
        ], 'public/js', 'vendor.js')
        .angular('resources/angular/app/', 'public/js', 'angular.js')

        // native JS
        .scriptsIn('resources/js', 'public/js/scripts.js')

        // vendor css
        .styles(["*.css"], 'public/css/vendor.css')

        // .version(["public/css/*.css", "js/*.js"])
    ;

});
