gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
runSequence = require('run-sequence'),
removeFiles = require('gulp-remove-files'),
fileExists = require('file-exists'),
gulpif = require('gulp-if'),
concat = require('gulp-concat');

gulp.task('sass2css', function(){
	return gulp
		.src('_src/sass/*')
		.pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('_dest/css'));
})

gulp.task('browserSync', function(){
	browserSync.init({
    server: '',
    port: 8080,
    ui:{ port: 8081}
  })
});

gulp.task('reload_watch', function(){
  gulp.start('watch')
})

gulp.task('watch' , function(){
  gulp.watch('_src/sass/**/*' , ['sass2css', browserSync.reload])
  gulp.watch('index.html' , browserSync.reload)
	gulp.watch('_dest/css/*' , browserSync.reload)
	gulp.watch('gulpfile.js' , browserSync.reload)
});
gulp.task('default', ['browserSync', 'watch'] ,function(){})
