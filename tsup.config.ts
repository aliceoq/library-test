import { defineConfig } from 'tsup'
// import css from "rollup-plugin-import-css"
import scss from 'rollup-plugin-scss'
import sass from 'sass'
import styles from "rollup-plugin-styles";
import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  format: 'esm',
  esbuildPlugins: [
    sassPlugin({
      async transform(source) {
          const { css } = await postcss([autoprefixer]).process(source);
          return css;
      },
  }),
  ]
})