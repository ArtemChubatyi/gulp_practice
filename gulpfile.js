var gulp         = require('gulp');
var gulpCopy     = require('gulp-copy');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
const imagemin   = require('gulp-imagemin');

gulp.task('copy', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
	})
})

gulp.task('styles', function() {
    return gulp.src('src/css/**/*.css')
    .pipe(concat('main.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream())
});

gulp.task('optimize', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', ['copy', 'optimize', 'styles', 'browser-sync'], function() {
	gulp.watch('src/css/**/*.css', ['styles']);
	gulp.watch('src/*.html', ['copy', browserSync.reload])
});

gulp.task('default', ['watch']);



