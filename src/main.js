// @flow

import jobs from "./allJobs";
import {run} from "./orchestrator";

async function main() {
  const args = process.argv.slice(2);
  let outputDir = "test-output-dir";
  if (args.length > 0) {
    outputDir = args[0];
  }
  process.exitCode = await run(jobs, outputDir);
}

main();
