var gulp   = require('gulp'),
	uglify 		= require('gulp-uglify'),
	rimraf		= require('rimraf'),
	browserSync = require('browser-sync'),
	babel       = require('gulp-babel'),
	rollup 		= require('rollup-stream'),
	nodeResolve = require('rollup-plugin-node-resolve'),
	commonjs  	= require('rollup-plugin-commonjs'),
	source 		= require('vinyl-source-stream'),
	buffer		= require('vinyl-buffer'),
	sourcemaps  = require('gulp-sourcemaps');


gulp.task('clear-bundle', function(cb) {
	return rimraf('./build', cb);
});

gulp.task('bundle',['clear-bundle'], function() {
    // Single entry point to browserify
    return rollup({
			entry: './src/app/app.js',
			sourceMap: true,
			plugins: [
				nodeResolve({
					jsnext: true,
					main: true,
				}),
				commonjs({
					include: 'node_modules/**',
				}),
			]
		})
		.pipe(source('app.js', './src/app'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write({
			destPath: '.',
			sourceRoot: '/src/app',
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
	gulp.watch('src/**/*.js',['script-watch','bundle']);
	gulp.watch('./*.html',['script-watch','bundle']);
});

