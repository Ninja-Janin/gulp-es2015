var gulp        = require('gulp'),
	$           = require('gulp-load-plugins')(),
	rimraf      = require('rimraf'),
	browserSync = require('browser-sync'),
	rollup      = require('rollup-stream'),
	nodeResolve = require('rollup-plugin-node-resolve'),
	commonjs    = require('rollup-plugin-commonjs'),
	source      = require('vinyl-source-stream'),
	buffer      = require('vinyl-buffer');

gulp.task('copyFonts', function(){
    return gulp.src('./bower_components/font-awesome/fonts/**/*.*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('copyViews', function(){
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('clear-bundle', function(cb) {
	return rimraf('./build', cb);
});

gulp.task('bundle',['copyViews','copyFonts','clear-bundle'], function() {
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
		.pipe($.sourcemaps.init({loadMaps: true}))
		.pipe($.uglify())
		.pipe($.sourcemaps.write({
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

