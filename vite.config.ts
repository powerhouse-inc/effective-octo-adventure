import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";
const commonjs = require('vite-plugin-commonjs')

export default defineConfig(() => {
  return {
    plugins: [
      graphqlLoader(),
      commonjs(),
    ]
  };
});