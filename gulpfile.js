var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var using = require('gulp-using');

gulp.task('sass', function () {

	var targetSRC = 'scss/**/*.scss';
	var targetDEST = './css/';

	gulp.watch(targetSRC, function () {

		gulp.src('scss/*.scss')
			.pipe(changed(targetDEST + 'min', {extension: '.min.css'}))
			.pipe(using({path: 'relative', prefix: 'Compiling', color: 'yellow', filesize: true}));

		gulp.src(targetSRC)
			.pipe(sass({includePaths: ['_/sass/']}).on('error', sass.logError))
			.pipe(gulp.dest(targetDEST));

		gulp.src(targetSRC)
			.pipe(sourcemaps.init())
			.pipe(sass({includePaths: ['_/sass/'], outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(rename({extname: '.min.css'}))
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest(targetDEST + 'min'));

	});

});

gulp.task('scss', ['sass']);

gulp.task('default');