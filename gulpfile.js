const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const imgCompress = require('imagemin-jpeg-recompress')

gulp.task('js', () => {
    return gulp.src('./src/js/**.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('build'))
})

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build'))
})

gulp.task('styles', () => {
    return gulp.src('src/style/**.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(gulp.dest('build'))
})

gulp.task('img', function() {
    return gulp.src('src/img/**/*.*')
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/img'));
});

gulp.task('clear', () => del('build'))

gulp.task('watch', () => {
    sync.init({
        server: './build'
    })

    gulp.watch('src/**.html', gulp.series('html')).on('change', sync.reload)
    gulp.watch('src/style/**.scss', gulp.series('styles')).on('change', sync.reload)
    gulp.watch('src/js/**.js', gulp.series('js')).on('change', sync.reload)
    gulp.watch('src/img/**/*.*', gulp.series('img')).on('change', sync.reload)
})

gulp.task('build', gulp.series('clear', 'js','styles', 'html', 'img'))