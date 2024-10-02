const gulp = require('gulp');
const browserSync = require('browser-sync').create(); // Создаем экземпляр browserSync
const sass = require('sass'); // Используем новую версию Dart Sass
const gulpSass = require('gulp-sass')(sass); // Связываем gulp-sass с Dart Sass
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload); // Отслеживаем изменения в HTML
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError)) // Используем gulpSass
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream()); // Обновляем CSS без перезагрузки страницы
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series('styles')); // Используем gulp.series для более гибкого выполнения
    gulp.watch("src/*.html").on('change', gulp.parallel('html')); // Отслеживаем изменения в HTML
});

gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function(){
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('icons', function(){
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('images', function(){
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('server', 'watch', 'styles', 'scripts', 'icons', 'html', 'images')); // 'watch' и 'server' можно запускать параллельно
