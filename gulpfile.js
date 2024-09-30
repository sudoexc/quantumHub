const gulp = require('gulp');
const browserSync = require('browser-sync').create(); // Улучшение: создаем экземпляр
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload); // Отслеживаем изменения в HTML
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'], // Можно добавить для лучшей поддержки браузеров
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream()); // Обновляем CSS без перезагрузки страницы
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.series('styles')); // Используем gulp.series для более гибкого выполнения
    gulp.watch("src/*.html").on('change', browserSync.reload); // Добавляем отслеживание изменений в HTML
});

gulp.task('default', gulp.parallel('server', 'watch')); // 'watch' и 'server' можно запускать параллельно
