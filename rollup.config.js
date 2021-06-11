import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import builtins from 'rollup-plugin-node-builtins'
import json from "@rollup/plugin-json";
// import babel from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "./gen/index.browser.ts",
    plugins: [
      commonjs(),
      json(),
      typescript({
        tsconfig:'./tsconfig.rollup.json'
      }),
      resolve({ browser: true }),
      terser(),
    ],
    output: [
      {
        name: "xyz",
        format: "iife",
        file: "output/xyz.min.js",
      },
    ],
  },
];
