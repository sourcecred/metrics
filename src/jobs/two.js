// @flow

import type {Job, JobResult} from "../job";
import type {Message} from "../frame";

export default {
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
