// @flow

import type {Job, JobResult} from "../job";
import type {Message} from "../frame";

export default {
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
