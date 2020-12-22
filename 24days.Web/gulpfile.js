const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');

function tailwind() {

    return src('./css/tailwind.css')
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer')
        ]))
        .pipe(concat('24days.css'))
        .pipe(dest('css'));
}

exports.tailwind = tailwind;
