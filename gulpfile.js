var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var webpack = require('gulp-webpack');
var tslint = require("gulp-tslint");
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task("default", ["clean"], function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "prose" //verbose
        }))
        .pipe(tslint.report({
          emitError: false
        }))
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        // .pipe(ts({
        //   declaration: true
        // }))
        // .pipe(webpack({
        //   entry: {
        //     webpack: 'dist/main.js',
        //     test: 'dist/lib/lib.js',
        //   },
        //   output: {
        //     filename: '[name].js',
        //     libraryTarget: 'var', //commonjs2
        //     library: '[name]'
        //   }
        // }))
        
});

gulp.task("job", ["clean", "tslint", "compile", "webpack"], function() {
  return gulp.src("dist/webpack.js")
          .pipe(uglify())
          .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function() {
 return gulp.src(["./build", "./dist"])
       .pipe(clean());  
});

gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report({
          emitError: false
        }))
);

gulp.task("compile", ["clean"], function () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("dist"))
});

gulp.task("webpack", ["compile"], function() {
  return gulp.src('./')
        .pipe(webpack(
        {
          entry: {
            webpack: './dist/main.js'
          },
          output: {
            filename: '[name].js',
            libraryTarget: 'var', //commonjs2
            library: '[name]'
          }
        }
    ))
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
})