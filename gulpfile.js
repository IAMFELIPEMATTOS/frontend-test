var gulp			= require('gulp');
var sass 			= require('gulp-sass');
var plumber		= require('gulp-plumber');

gulp.task('scss', function(){
	gulp.src('./public/scss/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('./public/stylesheets'))
});


gulp.task('default', ['scss'], function(){
	gulp.watch('./public/scss/**/*.scss', ['scss']);
});