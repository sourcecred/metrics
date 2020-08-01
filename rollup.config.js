// @flow

import rollupPluginFlow from "rollup-plugin-flow";

export default {
  input: ["src/jobs/one.js", "src/jobs/two.js"],
  output: {
    dir: "bin",
    format: "cjs",
  },
  plugins: [rollupPluginFlow()],
};
