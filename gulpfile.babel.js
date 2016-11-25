import gulp from 'gulp';
import jade from 'gulp-jade';
import connect from 'gulp-connect';
import stylus from 'gulp-stylus';
import plumber from 'gulp-plumber';

gulp.task('connect', () => {
    connect.server({
        root: './dist',
        livereload: true
    });
});

gulp.task('style', () => {
    return gulp.src('./style/**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
})

gulp.task('html', () => {
    return gulp.src('./templates/**/*.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
})

gulp.task('watch', () => {    
    gulp.watch(['./templates/**/*.jade'], ['html']);
    gulp.watch(['./style/**/*.styl'], ['style']);
});

gulp.task('default', ['html', 'style', 'connect', 'watch'])