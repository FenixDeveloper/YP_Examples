const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const DIST_PATH = './dist';

function css() {
	return gulp.src('./src/scss/styles.scss')
		.pipe(sass({
			includePaths: ['src/scss']
		}).on('error', sass.logError))
		.pipe(postcss([autoprefixer]))
		.pipe(gulp.dest(`${DIST_PATH}/css`));
};

function html() {
	return gulp.src('./src/common.bundles/**/*.html')
		.pipe(gulp.dest(`${DIST_PATH}`));
}

function fonts() {
	return gulp.src('./src/fonts/**/*').pipe(gulp.dest(`${DIST_PATH}/fonts`));
}

function images() {
	return gulp.src('./src/images/**/*').pipe(gulp.dest(`${DIST_PATH}/images`));
}

function public() {
	return gulp.src('./src/public/**/*').pipe(gulp.dest(`${DIST_PATH}`));
}

exports.css = css;
exports.html = html;
exports.assets = gulp.series(fonts, images, public);
exports.default = gulp.series(css, html, fonts, images, public);