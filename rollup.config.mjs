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
      dir: "./dist",
      format: "esm",
      sourcemap: true,
      inlineDynamicImports: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      css(),
      json(),
      terser(),
    ],
    external: ["react", "react-dom", "@vtex/brand-ui"],
  },
];
