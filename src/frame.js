// @flow

import type {Iso8601String} from "./date";
import type {JsonObject} from "./json";

export type Frame<+T> = {|
  // Timestamp at which this message was computed, as an ISO 8601
  // string representing an instant, conventionally in UTC with second
  // precision.
  +timestamp: Iso8601String, // "2001-02-03T04:05:06Z"
  +result: Message<T>,
|};

export type Message<+T> = {|
  // Payload.
  +value: T,
  // Structured description of any errors that occurred in processing.
  +errors?: $ReadOnlyArray<JsonObject>,
|};
