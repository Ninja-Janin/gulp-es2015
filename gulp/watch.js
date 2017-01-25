var gulp        = require('gulp'),
	util  =  require('gulp-util'),
	browserSync = require('browser-sync'),
	bundle = require('./transpile'),
	reload = require('./reload');

gulp.task('watch',function(){

	browserSync({
		server:{
			baseDir: './'
		}
	});

	gulp.watch('src/app/**/*.js', ['reload']),
	gulp.watch('src/app/**/*.html', ['reload'])
        .on('change', function(file) {
            // util.log('Starting transpile...');
            util.log('LukeMags transpiler starting...');

            bundle(file.path)
                .on('end', function() {
                    util.log('Finished transpile.');
                    util.log('Starting bundle...');
                });
        });
});

