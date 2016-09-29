var gulp = require("gulp");
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// var filesize = require('gulp-filesize');
// var watch = require('gulp-watch');

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tslint = require("gulp-tslint");
var sourcemaps = require('gulp-sourcemaps');

var webpack = require('webpack');
var webpackstream = require('webpack-stream');
var browserSync = require('browser-sync').create();

var webpackgulp = require('gulp-webpack');

var fs = require('fs')
var license = "";
fs.readFile('./index.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  license = data;
  console.log(data);
});


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
        .pipe(gulp.dest('./dist'))
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


// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function (done) {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(["src/**/*.ts"], ['js-watch']);
    gulp.watch(["color.html"], ['js-watch']);


    done();
});

gulp.task("js-watch", ["js"], function(done) {
  browserSync.reload();
  done();
})

gulp.task("js", ['compile', 'copyHTML'], function() {
  return gulp.src('.')
    .pipe(webpackstream({
      entry: {
        test: './build/main.js'
      },
      output: {
        filename: '[name].js',
        libraryTarget: 'var', //commonjs2
        library: 'gvis'
      },
      devtool: 'source-map',
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          output: {
            indent_start     : 0,
            indent_level     : 4,
            quote_keys       : false,
            space_colon      : true,
            ascii_only       : false,
            unescape_regexps : false,
            inline_script    : false,
            width            : 80,
            max_line_len     : 100,
            beautify         : false,
            source_map       : null,
            bracketize       : false,
            semicolons       : true,
            comments         : false,
            shebang          : true,
            preserve_line    : false,
            screw_ie8        : true,
            preamble         : null,
            quote_style      : 0,
            keep_quoted_props: false
          }
        }),
        new webpack.BannerPlugin(license)
      ]
    }))
    .pipe(gulp.dest('dist/'))
    .on('error', gutil.log) 

})



gulp.task("job", ["clean", "tslint", "compile", "webpack"], function() {
  return gulp.src("dist/webpack.js")
          .pipe(uglify())
          .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function(done) {
 gulp.src(["./build", "./dist"])
       .pipe(clean())
  .on('error', gutil.log)


 done()
});

gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report({
          emitError: false
        }))
  .on('error', gutil.log)

);

gulp.task("compile", ["clean", "tslint"], function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'))
        .on('error', gutil.log)
});

gulp.task("copyHTML", ["compile"], function() {
  return gulp.src('*.html')
        .pipe(gulp.dest('build'))
})

gulp.task('ugl', function() {
  return gulp.src('build/bundle.js')
        .pipe(uglify({
          mangle: false,
          output : {
            beautify      : false, // beautify output?
            max_line_len  : 40, // maximum line length (for non-beautified output)
            source_map    : true,  // output a source map
            indent_start  : 0,     // start indentation on every line (only when `beautify`)
            indent_level  : 4,     // indentation level (only when `beautify`)
            quote_keys    : false, // quote all keys in object literals?
            space_colon   : true,  // add a space after colon signs?
            ascii_only    : false, // output ASCII-safe? (encodes Unicode characters as ASCII)
            inline_script : false, // escape "</script"?
            width         : 80,    // informative maximum line width (for beautified output)
            bracketize    : false, // use brackets every time?
            comments      : false, // output comments?
            semicolons    : true,  // use semicolons to separate statements? (otherwise, newlines)
          }
        }))
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./build/'))
        .on('error', gutil.log)
})

gulp.task("webpack", ["compile", "copyHTML"], function() {
  return gulp.src('./')
        .pipe(webpackgulp({
          entry: {
            bundle: './build/main.js'
          },
          output: {
            filename: '[name].js',
            libraryTarget: 'var', //commonjs2
            library: 'gvis'
          },
          devtool: 'source-map'
        }))
        
        .pipe(gulp.dest('dist/'))
        .on('error', gutil.log)    

})


