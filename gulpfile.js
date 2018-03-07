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

// var condition = true;
var condition = function () {
  if( fileExists('_dest/css/main.css'))
    return true;
};

gulp.task('removeFiles', function(){
  return gulp.src('_dest/css/main.css')
  .pipe(gulpif(condition, removeFiles()))
})

// gulp.task('removeFiles' , function(){
//   fileExists('_dest/css/main.css').then(exists => {
//   console.log(exists) // OUTPUTS: true or false
//   gulp.src('_dest/css/main.css')
//   .pipe(removeFiles())
// })
// });

gulp.task('concat' , function(){
  return gulp.src('_dest/css/**/*')
    .pipe(concat("main.css"))
    .pipe(gulp.dest('_dest/css/'))
});

gulp.task('build', function(callback){
	 runSequence('removeFiles', 'sass2css', ['concat'], callback)
})

gulp.task('watch' , function(){
  gulp.watch('_src/sass/**/*' , ['build'])
  // gulp.watch('_src/sass/**/*' , ['concat'])
  gulp.watch('index.html' , browserSync.reload)
	gulp.watch('_dest/css/main.css' , browserSync.reload)
	gulp.watch('gulpfile.js' , browserSync.reload)
});
gulp.task('default', ['browserSync', 'watch'] ,function(){})
