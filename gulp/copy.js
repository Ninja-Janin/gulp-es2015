var gulp        = require('gulp');

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

