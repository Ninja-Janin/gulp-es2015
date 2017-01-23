var gulp   = require('gulp'),
	uglify 		= require('gulp-uglify'),
	rimraf		= require('rimraf'),
	browserSync = require('browser-sync'),
	babel       = require('gulp-babel'),
	rollup 		= require('rollup-stream'),
	source 		= require('vinyl-source-stream'),
	buffer		= require('vinyl-buffer'),
	sourcemaps  = require('gulp-sourcemaps');


gulp.task('clear-bundle', function(cb) {
	return rimraf('./build', cb);
});

gulp.task('bundle',['clear-bundle'], function() {
    // Single entry point to browserify
    return rollup({
			entry: './src/app.js',
			sourceMap: true,
		})
		.pipe(source('app.js', './src'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write({
			destPath: '.',
			sourceRoot: '/src',
		}))
		.pipe(gulp.dest('./build/', {
			overwrite: true
		}))
});

gulp.task('script-watch',browserSync.reload);

gulp.task('watch',['bundle'] ,function(){
	browserSync({
		server:{
			baseDir: './'
		}
	});
	gulp.watch('src/*.js',['script-watch','bundle']);
	gulp.watch('./*.html',['script-watch','bundle']);
});

