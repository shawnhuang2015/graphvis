import commonjs from 'rollup-plugin-commonjs';

export default {
entry: 'build/main.js',
dest: 'dist/rollup.js',
format: 'iife', // amd, cjs, es6, iife, umd
moduleName: 'gvis',
external: ['d3', 'lodash'],
plugins: [
    commonjs()
]}