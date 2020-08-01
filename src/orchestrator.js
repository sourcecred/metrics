// @flow

import {dirname, join} from "path";

import {mkdirp, readFile, rename, writeFile} from "fs-extra";
import stringify from "json-stable-stringify";

import type {Frame, Message} from "./frame";
import type {Job, JobResult} from "./job";

export async function run(
  jobs: $ReadOnlyArray<Job>,
  outputDirectory: string
): Promise<number> {
  let failed = false;
  for (const job of jobs) {
    console.log("Running: " + job.name());
    const status = await runOne(job, outputDirectory);
    switch (status) {
      case "FAILED":
        console.log("Failed: " + job.name());
        failed = true;
        break;
      case "PASSED":
        console.log("Passed: " + job.name());
        break;
      default:
        throw new Error((status: empty));
    }
  }
  console.log("--- " + (failed ? "Failed" : "Passed"));
  return failed ? 1 : 0;
}

type JobStatus = "FAILED" | "PASSED";

async function runOne(job: Job, outputDirectory: string): Promise<JobStatus> {
  const jobName = job.name();
  let result: JobResult;
  try {
    result = (await job.run(): JobResult);
  } catch (e) {
    console.error(`Internal error in ${jobName}: ${e}`);
    return "FAILED";
  }
  const {version, message} = result;
  const filepath = join(outputDirectory, jobName, `${jobName}_${version}.json`);
  const frame = {
    timestamp: new Date().toISOString(),
    result: message,
  };
  const line = stringify(frame) + "\n";
  await safeAppend(line, filepath);
  return (message.errors || []).length > 0 ? "FAILED" : "PASSED";
}

async function safeAppend(line: string, filepath: string): Promise<void> {
  await mkdirp(dirname(filepath));
  let oldContents = "";
  try {
    oldContents = await readFile(filepath);
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
  // (file name not safe in general, but this is an internal process
  // and not public utility code)
  const tmpFilepath = `${filepath}.tmp`;
  const newContents = oldContents + line;
  await writeFile(tmpFilepath, newContents);
  await rename(tmpFilepath, filepath);
}
