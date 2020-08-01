// @flow

import type {Job, JobResult} from "../job";

const job: Job = {
  name() {
    return "two";
  },
  async run(): Promise<JobResult> {
    return {
      version: "v2",
      message: {
        value: null,
        errors: ["not on yer life"],
      },
    };
  },
};

export default job;
