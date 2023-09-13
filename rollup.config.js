import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import css from "rollup-plugin-import-css";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: './dist',
      format: "es",
      // sourcemap: true,
      // inlineDynamicImports: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript({ tsconfig: "./tsconfig.json" }),
      css({ modules: true }),
      json(),
      commonjs(),
      terser(),
    ],
    // external: ["react", "react-dom", "@vtex/brand-ui"],
    external: [
      'react',
      '@mdx-js/react',
      'react/jsx-runtime',
      './jsx-runtime.cjs',
    ],
  },
];
