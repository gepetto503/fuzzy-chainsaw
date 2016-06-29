const requireDir = require('require-dir')
const gulp = require('gulp');
const sequence = require('run-sequence').use(gulp);

// import all tasks from task folders
requireDir('./tasks', { recurse: true });

// main tasks

// watchers
gulp.task('watch', function() {
  sequence([
    'styles-watch',
    'scripts-watch',
    'svgs-watch',
    'lint-styles-watch',
    'lint-html-watch'
  ]);
});

// build-pre contains task that should
// be done before build-core
gulp.task('build-pre', function(done) {
  sequence(
    'clean',
    ['check-versions', 'lint-styles'],
    done
  );
});

// build-core is the minimal build tasks
// required to get the project started
// like stylesheets, scripts and templates
gulp.task('build-core', function(done) {
  sequence([
    'styles',
    'scripts',
    'images',
    'fonts',
    'svgs',
    'pages',
  ], [
    'lint-html'
  ], done);
});

// build-extras is the optional tasks
// like styleguide and documentation
gulp.task('build-extras', function(done) {
  done();
  // sequence([
    // 'styleguide'
  // ], done);
});

// production runs the full shabang build
gulp.task('production', function(done) {
  sequence('build-pre', 'build-core', 'build-extras', done);
});

// the default task is to do the minimal build
gulp.task('default', function(done) {
  sequence('build-pre', 'build-core', done);
});
