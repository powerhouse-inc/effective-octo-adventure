import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";

export default defineConfig(() => {
  return {
    plugins: [
      // @ts-expect-error - we only need this because of the weird code generator used in scripts. once we get rid of that we can get rid of this config entirely
      commonjs(),
    ],
  };
});
