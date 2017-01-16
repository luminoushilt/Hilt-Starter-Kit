// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	prefix = require('gulp-autoprefixer'),
	image = require('gulp-image'),
	uglify = require('gulp-uglify'),
	coffee = require('gulp-coffee'),
	browserSync = require('browser-sync').create();


// --------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------

var code = {
	sass: ['_dev/Assets/css/1-tools/*.sass', '_dev/Assets/css/2-base/*.sass', '_dev/Assets/css/3-modules/*.sass', '_dev/Assets/css/4-pages/*.sass', '_dev/Assets/css/*.sass', '_dev/Assets/css/1-tools/*.scss', '_dev/Assets/css/2-base/*.scss', '_dev/Assets/css/3-modules/*.scss', '_dev/Assets/css/4-pages/*.scss'],
	pug: '_dev/*.pug',
	coffee: '_dev/Assets/js/*.coffee',
	jsOut: '_dev/Assets/js/',
	jsIn: '_dev/Assets/js/*.js',
	img: '_dev/Assets/img/*',
	css: '_dev/Assets/css',
	root: '_dev/'
};

var output = {
	js: '_site/Assets/js/',
	css: '_site/Assets/css',
	img: '_site/Assets/img',
	html: '_site/*.html',
	root: '_site/'
};


// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function(err) {
	console.log(err);
	this.emit('end');
};


// --------------------------------------------------------------------
// Task: Image
// --------------------------------------------------------------------

gulp.task('image', function() {

	return gulp.src(code.img)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(image())
		.pipe(gulp.dest(output.img));
});

// --------------------------------------------------------------------
// Task: Coffee Script
// --------------------------------------------------------------------

gulp.task('coffee', function() {
	return gulp.src(code.coffee)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(coffee({
			bare: true
		}))
		.pipe(gulp.dest(code.jsOut));
});

// --------------------------------------------------------------------
// Task: js / Uglify
// --------------------------------------------------------------------

gulp.task('js', function() {

	return gulp.src(code.jsIn)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(uglify())
		.pipe(gulp.dest(output.js));
});

gulp.task('js-watch', ['js'], browserSync.reload);

// --------------------------------------------------------------------
// Task: Sass
// --------------------------------------------------------------------

gulp.task('sass', function() {

	return gulp.src(code.sass)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			includePaths: ['css'],
			outputStyle: 'expanded',
			onError: browserSync.notify
		}))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}))
		.pipe(gulp.dest(output.css))
		.pipe(browserSync.stream())
		.pipe(gulp.dest(code.css));
});

// --------------------------------------------------------------------
// Task: pug
// --------------------------------------------------------------------

gulp.task('pug', function() {

	return gulp.src(code.pug)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(output.root));
});

// --------------------------------------------------------------------
// Task: Browser Sync Server
// --------------------------------------------------------------------

gulp.task('serve', ['sass', 'pug', 'image', 'coffee', 'js'], function() {
	browserSync.init({
		server: {
			baseDir: output.root
		}
	});
});

// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function() {
	gulp.watch(code.pug, ['pug']);
	gulp.watch(code.sass, ['sass']);
	gulp.watch(code.img, ['image']);
	gulp.watch(code.coffee, ['coffee']);
	gulp.watch(code.jsIn, ['js-watch']);
	gulp.watch(output.html).on('change', browserSync.reload);
});

// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', ['serve', 'watch']);