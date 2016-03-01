var gulp = require('gulp');
var serve = require('gulp-serve');
var stylus = require('gulp-stylus');
// var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var jsDist = "./public/javascripts/dist";
var jsSrc = "./public/javascripts/"

gulp.task('serve', serve({ root: ['public','bower_components'],
  port: 3001,}));

gulp.task('compile_css', function() {
  gulp.src('./public/styles/*.stylus')
    .pipe(stylus().on('error', gutil.log))
    .pipe(gulp.dest('./public/styles/'));
});



// gulp.task('coffee', function() {
//   gulp.src(jsSrc + '*.coffee')
//     .pipe(coffee().on('error', gutil.log))
//     .pipe(gulp.dest(jsDist))
// });


gulp.task('react', function() {
    var task = babel({"presets":['react']});
    task.on('error', function(e){
    	gutil.log(e);
    	task.end();
    });

	gulp.src(jsSrc+'*.jsx')
	.pipe(sourcemaps.init())
	.pipe(task)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(jsDist));
});



gulp.task('watch',function(){
	// gulp.watch(jsSrc+'*.coffee',['coffee']);
	gulp.watch(jsSrc+'*.jsx',['react']);
	gulp.watch('./public/styles/*.stylus',['compile_css']);
})

gulp.task('default',['serve',/*'coffee',*/'compile_css','react','watch']);
