const dir = {
    src         : '_src/',
    build       : '_build/'
  },
gulp = require('gulp'),
sass = require('gulp-sass');

gulp.task('sass2css', function(){
	return gulp
		.src('_src/sass/*')
		.pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('_dest/css'));
})

gulp.task('watch', function(){
  gulp.watch('_src/sass/**/*' , ['sass2css'])
})
