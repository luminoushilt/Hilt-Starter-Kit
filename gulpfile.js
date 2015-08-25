// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp        = require("gulp"),
	jade		= require("gulp-jade"),
	sass        = require("gulp-sass"),
	plumber     = require("gulp-plumber"),
	prefix      = require("gulp-autoprefixer"),
	browserSync = require("browser-sync").create();


// --------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------

var code = {
	sass: ['./Assets/css/1-tools/*.sass', './Assets/css/2-base/*.sass', './Assets/css/3-modules/*.sass', './Assets/css/4-pages/*.sass','./Assets/css/*.sass' , './Assets/css/1-tools/*.scss', './Assets/css/2-base/*.scss', './Assets/css/3-modules/*.scss', './Assets/css/4-pages/*.scss'],
	jade: ["./*.jade", "./**/*.jade", "./Assets/include/*.jade"],
	html: "./**/*.html",
	css: "./Assets/css",
	root: "./"
};

 //var output = {
	//js: "output/js",
	//css: "output/css",
	//img: "output/img/",
	//html: "output/**.html",
	//min_css: 'app.min.css',
	//min_js: 'app.min.js'
//};


// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function(err) {
	console.log(err);
	this.emit('end');
};


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
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest(code.css))
		.pipe(browserSync.stream());
});


// --------------------------------------------------------------------
// Task: Jade
// --------------------------------------------------------------------

gulp.task('jade', function() {

	return gulp.src(code.jade)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(code.root));
});


// --------------------------------------------------------------------
// Task: Browser Sync Server
// --------------------------------------------------------------------

gulp.task('serve', ['sass', 'jade'], function() {
	browserSync.init({
		server: {
			baseDir: code.root
		}
	});
});


// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function() {
	gulp.watch(code.jade, ['jade']);
	gulp.watch(code.sass, ['sass']);
	gulp.watch(code.html).on('change', browserSync.reload);
});


// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', ['serve','watch']);
