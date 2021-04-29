import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      exports: 'named',
      sourcemap: process.env.prod ? false : 'inline'
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: process.env.prod ? false : 'inline'
    }
  ],
  external: [ ...Object.keys(pkg.dependencies), 'path' ],
  plugins: [
    json({
      preferConst: true
    }),
    terser({
      warnings: 'verbose'
      , compress: { passes: 2 }
    })
  ]
}
