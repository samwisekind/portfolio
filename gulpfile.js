var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var using = require('gulp-using');
var closureCompiler = require('google-closure-compiler').gulp();
var argv = require('yargs').argv;

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

gulp.task('js', function () {

	if (argv.target === undefined) {

		console.error('You must use the --target flag!');
		return false;

	}
	else if (argv.target === true) {

		console.error('You must define a file name after the --target flag!');
		return false;

	}
	else {

		var compilerOptions = {
			compilation_level: 'ADVANCED',
			language_in: 'ECMASCRIPT6',
			language_out: 'ECMASCRIPT5',
			js_output_file: argv.target + '.min.js'
		};

		if (argv.pretty === true) {

			compilerOptions.formatting = 'pretty_print';

		}

		return gulp.src('js/' + argv.target + '.js')
			.pipe(closureCompiler(compilerOptions))
			.pipe(gulp.dest('js/min'));

	}

});

gulp.task('scss', ['sass']);
gulp.task('default');