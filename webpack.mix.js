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
   .sass('resources/assets/sass/global.scss', 'public/css').options({
      processCssUrls: false
   })
   .sass('resources/assets/sass/home.scss', 'public/css').options({
      processCssUrls: false
   })
   .sass('resources/assets/sass/project.scss', 'public/css').options({
      processCssUrls: false
   })
   .sass('resources/assets/sass/photography.scss', 'public/css').options({
      processCssUrls: false
   })
   .copyDirectory('resources/assets/images', 'public/images');
