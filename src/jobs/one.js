// @flow

import type {Job, JobResult} from "../job";

const job: Job = {
  name() {
    return "one";
  },
  async run(): Promise<JobResult> {
    return {
      version: "v1",
      message: {
        value: 1,
        errors: [],
      },
    };
  },
};

export default job;
