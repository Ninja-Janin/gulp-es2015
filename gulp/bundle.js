var gulp = require('gulp');

gulp.task('bundle', bundle);

function bundle(){
	console.log('bundleTask');
}

module.exports = bundle;
