import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const isProduction = process.env.NODE_ENV === 'production'

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'raf-plus',
    plugins: [
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
