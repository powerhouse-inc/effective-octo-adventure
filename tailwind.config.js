import { join } from "node:path";
import { designSystemPreset } from "@powerhousedao/config";
import { editorsDir } from "./powerhouse.config.json";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [join(editorsDir, "**/*.{js,jsx,ts,tsx}")],
  presets: [designSystemPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
