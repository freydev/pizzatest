import gulp from 'gulp';
import jade from 'gulp-jade';
import connect from 'gulp-connect';
import stylus from 'gulp-stylus';
import plumber from 'gulp-plumber';
import data from 'gulp-data';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

function getRandomInt(min, max, float) {
  let randomFloat = Math.random() * (max - min) + min;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;

  if (float) {
    let digit = getRandomInt(1, 2);
    let round = getRandomInt(0, 10) < 5;

    return round ? random.toString() : randomFloat.toFixed(digit)
  }

  if (!float) return random
}

function range(max) {
    return Array(max).fill().map((_, i) => i + 1);
}


gulp.task('connect', () => {
    connect.server({
        root: './dist',
        livereload: true
    });
});

gulp.task('scripts', () => {
    return gulp.src('./scripts/**/*.babel.js')
        .pipe(plumber())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(rename(path => {
            path.basename = path.basename.replace('.babel', '')
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
})

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
        .pipe((data(function(file) {
            let json = require('./data.json');
            return {
                random: getRandomInt,
                range: range,
                json: json
            }
        })))
        .pipe(jade())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
})

gulp.task('watch', () => {
    gulp.watch(['./templates/**/*.jade'], ['html']);
    gulp.watch(['./style/**/*.styl'], ['style']);
    gulp.watch(['./scripts/**/*.babel.js'], ['scripts']);
});

gulp.task('default', ['html', 'style', 'scripts', 'connect', 'watch'])
