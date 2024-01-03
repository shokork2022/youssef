// تعريف المهمة الافتراضية
function defaultTask(cb) {
    // قم بوضع الكود الخاص بالمهمة الافتراضية هنا
    cb();
}

exports.default = defaultTask;

// تعريف المكتبات والإضافات
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');

// مهمة HTML
gulp.task('html', function (cb) {
    return gulp.src('stage/html/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
        .on('end', cb);
});

// مهمة CSS
gulp.task('css', function (cb) {
    return gulp.src(["stage/css/**/*.css", "stage/css/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
        .on('end', cb);
});

// مهمة JS
gulp.task('js', function (cb) {
    return gulp.src("stage/js/*.js")
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
        .on('end', cb);
});

// مهمة المراقبة والتحميل التلقائي
gulp.task('watch', function (cb) {
    require('./server.js');
    livereload.listen();
    gulp.watch("stage/html/**/*.pug", gulp.task('html'));
    gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], gulp.task('css'));
    gulp.watch("stage/js/*.js", gulp.task('js'));
    cb();
});

// مهمة المراقبة الرئيسية
gulp.task('dev', gulp.series('watch', 'html', 'css', 'js'));