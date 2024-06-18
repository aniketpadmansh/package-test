import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import path from "node:path";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const BABEL_PLUGIN_OPTIONS = {
  exclude: "node_modules/**",
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  skipPreflightCheck: true,
  babelHelpers: "bundled",
};

const extensions = [".js", ".ts", ".jsx", ".tsx", ".scss"];

const TERSER_PLUGIN_OPTIONS = {
  compress: {
    keep_infinity: true,
    pure_getters: true,
    reduce_funcs: false,
  },
};

const plugins = [
  postcss({ sourceMap: false }),
  peerDepsExternal(),
  resolve({ extensions }),
  commonjs(),
  typescript({ useTsconfigDeclarationDir: true }),
  babel({ extensions, ...BABEL_PLUGIN_OPTIONS }),
  terser(TERSER_PLUGIN_OPTIONS),
];

export default [
  {
    input: Object.fromEntries([
      ...globSync("src/components/*.tsx").map((file) => [
        path.relative(
          "src",
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
      ...globSync("src/*.ts").map((file) => [
        path.relative(
          "src",
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
    ]),
    external: ["react", "react-dom"],
    plugins,
    output: {
      dir: "lib",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      name: "@sg-ui",
    },
  },
];
