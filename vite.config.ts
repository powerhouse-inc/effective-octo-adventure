import path from "node:path";
import { readdirSync, existsSync } from "node:fs";
import { defineConfig } from "vite";
import { InlineConfig } from "vitest/node";
import dts from "vite-plugin-dts";
import generateFile from "vite-plugin-generate-file";
import { getConfig } from "@powerhousedao/config/powerhouse";
import graphqlLoader from "vite-plugin-graphql-loader";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";

const { documentModelsDir, editorsDir, subgraphsDir } = getConfig();

const entry: Record<string, string> = {
  index: "index.ts",
  documentModels: path.resolve(documentModelsDir, "index.ts"),
  editors: path.resolve(editorsDir, "index.ts"),
  subgraphs: path.resolve(subgraphsDir, "index.ts"),
  manifest: "powerhouse.manifest.json",
};

// add subpackage for each editor
readdirSync(documentModelsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach((name) => {
    entry[name] = path.resolve(documentModelsDir, name, "index.ts");
  });

readdirSync(editorsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach((name) => {
    const editorPath = path.resolve(editorsDir, name, "index.ts");
    if (existsSync(editorPath)) {
      entry[`editors/${name}`] = editorPath;
    }
  });

readdirSync(subgraphsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach((name) => {
    const editorPath = path.resolve(subgraphsDir, name, "index.ts");
    if (existsSync(editorPath)) {
      entry[`subgraphs/${name}`] = editorPath;
    }
  });

export default defineConfig(() => {
  const externalPackages = [
    "react",
    "react/jsx-runtime",
    "react-dom",
    "@powerhousedao/reactor-browser",
    /^@powerhousedao\/reactor-browser\//,
    "@powerhousedao/reactor-api",
  ];

  const test: InlineConfig = {
    globals: true,
  };

  return {
    test,
    build: {
      minify: false,
      outDir: `dist`,
      emptyOutDir: true,
      lib: {
        entry,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external(id, importer) {
          // TODO create separate node build for subgraphs?
          if (["document-model", "document-drive"].includes(id)) {
            return true;
          }
          if (
            importer?.includes("subgraphs") &&
            (id.endsWith("document-model/dist/index.js") ||
              id.endsWith("document-drive/dist/index.js"))
          ) {
            return true;
          }

          if (
            importer?.startsWith(path.join(__dirname, "subgraphs")) &&
            (id.includes("node_modules") || id.startsWith("node:"))
          ) {
            console.log(id);
            return true;
          }

          return externalPackages.some(
            (pkg) => id === pkg || id.startsWith(pkg + "/"),
          );
        },
        output: {
          manualChunks: (id) => {
            if (
              id.startsWith(path.join(__dirname, "editors")) &&
              /editors\/[^/]+\/editor.tsx/.exec(id)
            ) {
              const editorName = path.basename(path.dirname(id));
              return `editors/${editorName}/editor`;
            } else if (
              id.startsWith(path.join(__dirname, "document-models")) &&
              /document-models\/[^/]+\/index.ts/.exec(id)
            ) {
              const modelName = path.basename(path.dirname(id));
              return `document-models/${modelName}`;
            } else if (id.includes("lazy-with-preload")) {
              return "utils/lazy-with-preload";
            }
          },
          entryFileNames: "[format]/[name].js",
          chunkFileNames: (info) => {
            // creates named chunk for editor components, document-models and utils
            if (info.name.startsWith("editors/")) {
              return `[format]/${info.name}.js`;
            } else if (info.name.startsWith("document-models/")) {
              return `[format]/${info.name}.js`;
            } else if (info.name.startsWith("utils")) {
              return `[format]/${info.name}.js`;
            } else {
              return "[format]/internal/[name]-[hash].js";
            }
          },
        },
      },
    },
    plugins: [
      commonjs(),
      tsconfigPaths(),
      graphqlLoader(),
      dts({ insertTypesEntry: true, exclude: ["**/*.stories.tsx"] }),
      generateFile([
        {
          type: "json",
          output: "./es/package.json",
          data: {
            type: "module",
          },
        },
        {
          type: "json",
          output: `./cjs/package.json`,
          data: {
            type: "commonjs",
          },
        },
      ]),
    ],
  };
});
