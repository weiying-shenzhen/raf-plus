import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import hypothetical from 'rollup-plugin-hypothetical'

const isProduction = process.env.NODE_ENV === 'production'

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'raf-plus',
    plugins: [
        hypothetical({
            allowRealFiles: true,
            files: {
                'node_modules/core-js/library/modules/es6.object.to-string.js': 'export default null'
            }
        }),
        resolve({ jsnext: true, main: true }),
        commonjs(),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
                [
                    'es2015', {
                        modules: false,
                    },
                ],
            ],
            plugins: ['external-helpers'],
        }),
        (isProduction && uglify()),
    ],
    dest: 'dist/index.js',
}
