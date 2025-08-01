import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [react()],
  // this is a workaround to avoid an issue:
  // TypeError: Unknown file extension ".css" for /effective-octo-adventure/node_modules/.pnpm/@powerhousedao+common@3.2.0_rz4fxkolpmk3fdmohca4wt2hdi/node_modules/@powerhousedao/common/dist/editors/styles.css
  resolve: {
    alias: {
      "@powerhousedao/common": resolve(__dirname, "test-utils/mocks.js"),
    },
  },
});
