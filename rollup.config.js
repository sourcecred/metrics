// @flow

import rollupPluginFlow from "rollup-plugin-flow";

export default {
  input: "src/main.js",
  output: {
    dir: "bin",
    format: "cjs",
  },
  plugins: [rollupPluginFlow()],
};
