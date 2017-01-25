var gulp        = require('gulp'),
	$           = require('gulp-load-plugins')();
	rimraf      = require('rimraf'),
	rollup      = require('rollup-stream'),
	nodeResolve = require('rollup-plugin-node-resolve'),
	commonjs    = require('rollup-plugin-commonjs'),
	source      = require('vinyl-source-stream'),
	buffer      = require('vinyl-buffer');
	sourcemaps  = require('gulp-sourcemaps');

gulp.task('bundle', bundle);

function bundle() {
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
		.pipe($.uglify())
		.pipe(sourcemaps.write({
			destPath: '.',
			sourceRoot: '/src/app',
		}))
		.pipe(gulp.dest('./build/', {
			overwrite: true
		}))
}

module.exports = bundle;
