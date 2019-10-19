import { createCompatibilityConfig } from '@open-wc/building-rollup';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const configs = createCompatibilityConfig({
  input: './index.html'
});

// map if you use an array of configs, otherwise just extend the config
export default configs.map(config => ({
  ...config,
  plugins: [
    globals(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // Allow json resolution
    json(),
    typescript({
      typescript: require('typescript'),
      objectHashIgnoreUnknownHack: true
    }),
    ...config.plugins,
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    resolve({
      browser: true,
      preferBuiltins: false,
      namedExports: {
        'typesafe-actions': 'getType'
      }
    }),
    builtins()
  ],
  external: [],
  watch: {
    include: ['index.html', 'src/**']
  }
}));
