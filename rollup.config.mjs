import process from 'node:process'
import commonJs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import dotenv from 'dotenv'
dotenv.config()

export default [{
  input: [
    'app/assets/javascripts/application.js'
  ],
  output: {
    dir: '.tmp/public/javascripts',
    sourcemap: true
  },
  plugins: [
    commonJs(), // Resolve CommonJS modules
    nodeResolve(), // Resolve modules imported from node_modules
    replace({
      values: {
        'process.env.OS_API_KEY': JSON.stringify(process.env.OS_API_KEY)
      },
      preventAssignment: false
    })
  ]
}]
