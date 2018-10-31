# Практическое задание по Gulp

gulpfile.js:

1. Обьявляю все переменные:
```js
var gulp         = require('gulp');
var gulpCopy     = require('gulp-copy');
var clean        = require('gulp-clean');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
const imagemin   = require('gulp-imagemin');
```
2. Таска для копирования файлов из src в dist (на деле выйдет, что копировать нужно будет только 1 html файл):
```js
gulp.task('copy', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
```
3. Таска для "очистки"
```js
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
```
3. Таск для зауска Browser-Sync:
```js
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false,
	})
})
```
4. Таск с необходимыми манипуляциями с файлами стилей:
```js
gulp.task('styles', function() {
   return gulp.src('src/css/**/*.css')
    .pipe(concat('main.css'))
	  .pipe(autoprefixer(['last 15 versions']))
	  .pipe(gulp.dest('dist/css'))
	  .pipe(browserSync.stream())
});
```
5. Таск для оптимизации изображений:
```js
gulp.task('optimize', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});
```
6. А теперь главное - таск который вызывает обьявленных выше "братьев" по необходимости:
```js
gulp.task('watch', ['copy', 'optimize', 'styles', 'browser-sync'], function() {
	gulp.watch('src/css/**/*.css', ['styles']);
	gulp.watch('src/*.html', ['copy', browserSync.reload])
});
```
7. Ну, а этот просто делает последний таск задачей по-умолчанию:
```js
gulp.task('default', ['watch']);
```

