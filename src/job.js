// @flow

import type {Message} from "./frame";

export interface Job {
  // Job name, as used in pathname contexts. Must match /[a-z][a-z0-9-]*/.
  name(): string;

  /**
   * Compute the latest value in the stream, asynchronously.
   *
   * If this promise rejects, the job is considered to have failed, and
   * nothing will be written to the stream.
   *
   * If the promise resolves, the message is written to the stream. The
   * job is considered to have to have passed if the message has no
   * errors, or to have failed otherwise.
   */
  run(): Promise<JobResult>;
}

export type JobResult = {|
  // Version name for the output format. Determines the output
  // filename. Should be like `vN` for some decimal number `N`: e.g.,
  // `v12`.
  +version: string,
  +message: Message<mixed>,
|};
