var gulp = require('gulp'),
    clean = require('gulp-clean'),
    // del = require('del'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    Notifier = require('node-notifier'),
    uglify = require('gulp-uglify');
    // rev = require('gulp-rev'),
    // revCollector = require('gulp-rev-collector');
// var notifier = new Notifier();

var base = '../front/';

var errorHandler = function(error) {
    Notifier.notify({
        message: error.message,
        title: error.plugin,
        sound: 'Glass'
    });
};

gulp.task('clean:dist', function(){
    return gulp.src([base+'public/dist/js/*',base+'public/dist/css/*','dist/js/*','dist/css/*']).pipe(clean({force: true}));
});

gulp.task('build:js',['clean:dist'], function(){
    return gulp.src('src/*.js')
            .pipe(plumber({errorHandler: errorHandler}))
            .pipe(rename(function(path){
                path.basename += ".min"
            }))
            .pipe(uglify({preserveComments: 'some'}))
            // .pipe(rev())
            .pipe(gulp.dest('dist/js'))
            .pipe(gulp.dest(base+'public/dist/js'));
            // .pipe(rev.manifest())
            // .pipe(gulp.dest('public/dist/rev/js'));
});

gulp.task('build:css',['build:js'], function(){
    return gulp.src('less/*.less')
            // .pipe(rename(function(path){
            //     path.basename += ".min"
            // }))
            .pipe(plumber({errorHandler: errorHandler}))
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest('dist/css'))
            .pipe(gulp.dest(base+'public/dist/css'));
            // .pipe(Notifier.notify({
            //     message: 'Gulp task completed!!!',
            //     sound: 'Funk'
            // }));
            // .pipe(rev.manifest())
            // .pipe(gulp.dest('public/dist/rev/js'));
});

// gulp.task('rev',['build:css'],function(){
//     return gulp.src(['public/dist/rev/js/*.json', 'resources/views/gulp_test/*.php'])
//             .pipe(revCollector({
//                 replaceReved: true
//             }))
//             .pipe(gulp.dest('resources/views/gulp_test/out/'));
// });


gulp.task('default', ['clean:dist','build:js','build:css']);
var watcher = gulp.task('watch', function(){
    gulp.watch([base+'public/dist/js',base+'public/dist/css','dist/js','dist/css'],['clean:dist']);
    gulp.watch(['src/*.js'],['build:js']);
    gulp.watch(['less/*.less'],['build:css']);
    // gulp.watch(['dist/js/*','dist/css/*'],function(){
        
    // });
});

watcher.on('change',function(){
    console.log('change');
    Notifier.notify({
        message: 'Gulp task completed!!!',
        sound: 'Funk'
    });
});