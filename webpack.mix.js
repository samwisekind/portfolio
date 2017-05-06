const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/global.js', 'public/js')
   .js('resources/assets/js/photography.js', 'public/js')
   .sass('resources/assets/sass/global.scss', 'public/css')
   .sass('resources/assets/sass/project-list.scss', 'public/css')
   .sass('resources/assets/sass/project.scss', 'public/css')
   .sass('resources/assets/sass/photography.scss', 'public/css');
