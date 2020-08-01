// @flow

import jobs from "./allJobs";
import {run} from "./orchestrator";

async function main() {
  process.exitCode = await run(jobs, "test-output-dir");
}

main();
